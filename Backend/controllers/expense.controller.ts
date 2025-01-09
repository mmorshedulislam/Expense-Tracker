import { Request, Response } from "express";
import Expense from "../models/expense.model";
import Limit from "../models/limit.model";

// Create a new expense
export const createExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, amount, purpose, date } = req.body;
        const expenseDate = date ? new Date(date) : new Date();
        // Current month and year
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        // Fetch limit for the category
        const limit = await Limit.findOne({ category, month, year });
        if (!limit) {
            res.status(400).json({
                success: false,
                message: `No limit set for category "${category}" in ${month}/${year}.`,
            });
            return;
        }

        // Calculate current expenses for the category and month
        const currentExpenses = await Expense.aggregate([
            { $match: { category, month, year } },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
        ]);

        const totalSpent = currentExpenses.length > 0 ? currentExpenses[0].totalSpent : 0;

        // Check if adding this expense exceeds the limit
        if (totalSpent + amount > limit.limit) {
            res.status(400).json({
                success: false,
                message: `Adding this expense exceeds the limit for ${category}. Current total: ${totalSpent}, Limit: ${limit.limit}`,
            });
            return;
        }

        // Save the new expense
        const newExpense = new Expense({ category, amount, purpose, date: expenseDate, month, year });
        await newExpense.save();
        res.status(201).json({ success: true, message: `Expense added successfully for ${category}`, data: newExpense });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error creating expense", error: error.message });
    }
};

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({ success: true, data: expenses });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error fetching expenses", error: error.message });
    }
};

// Get a single expense by ID
export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);
        if (!expense) {
            res.status(404).json({ success: false, message: "Expense not found" });
            return;
        }
        res.status(200).json({ success: true, data: expense });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error fetching expense", error: error.message });
    }
};

// Delete an expense
export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            res.status(404).json({ success: false, message: "Expense not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error deleting expense", error: error.message });
    }
};

// Get Monthly Summary
export const getMonthlySummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            res.status(400).json({ success: false, message: "Month and year are required" });
            return;
        }

        const targetMonth = parseInt(month as string, 10);
        const targetYear = parseInt(year as string, 10);

        // Aggregate expenses by day and category
        const expenses = await Expense.aggregate([
            {
                $match: {
                    month: targetMonth,
                    year: targetYear,
                },
            },
            {
                $group: {
                    _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, category: "$category" },
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $group: {
                    _id: "$_id.date",
                    categories: {
                        $push: {
                            category: "$_id.category",
                            amount: "$totalAmount",
                        },
                    },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        // Format response to include category totals for each day
        const formattedResponse = expenses.map((entry) => {
            const summary: { [key: string]: number | string } = { date: entry._id };
            entry.categories.forEach((categoryEntry: any) => {
                summary[categoryEntry.category] = categoryEntry.amount;
            });
            return summary;
        });

        res.status(200).json({ success: true, data: formattedResponse });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error fetching monthly summary", error: error.message });
    }
};

// Daily summary with optional category filtering
export const getDailySummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { day, month, year, category } = req.query;

        if (!day || !month || !year) {
            res.status(400).json({ success: false, message: "Day, month, and year are required" });
            return;
        }


        const startDate = new Date(Number(year), Number(month) - 1, Number(day), 0, 0, 0);
        const endDate = new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);

        const query: any = {
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        };

        if (category) {
            query.category = category;
        }

        const expenses = await Expense.find(query);

        // Format expenses into the required format
        const formattedExpenses = expenses.map(
            (expense) => `$${expense.amount} for ${expense.purpose}`
        );

        res.status(200).json({ success: true, data: formattedExpenses });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error fetching daily summary", error: error.message });
    }
};

export const getCategoryUsage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            res.status(400).json({ success: false, message: "Month and year are required" });
            return;
        }

        const selectedMonth = Number(month);
        const selectedYear = Number(year);

        const expenses = await Expense.aggregate([
            {
                $match: {
                    month: selectedMonth,
                    year: selectedYear,
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);

        const limits = await Limit.find();

        // Create a response object with percentage usage for each category
        const usagePercentages: Record<string, number> = {};
        expenses.forEach((expense) => {
            const category = expense._id;
            const totalAmount = expense.totalAmount;

            // Find the limit for the category
            const limit = limits.find((limit) => limit.category === category);

            if (limit) {
                const percentageUsed = limit.limit
                    ? ((totalAmount / limit.limit) * 100).toFixed(2)
                    : 0;
                usagePercentages[category] = Number(percentageUsed);
            }
        });

        res.status(200).json({ success: true, data: usagePercentages });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error fetching category usage", error: error.message });
    }
};
