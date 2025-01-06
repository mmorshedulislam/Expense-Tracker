import { Request, Response } from "express";
import Expense from "../models/expense.model";
import Limit from "../models/limit.model";

// Add a new expense
export const addExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, amount, description } = req.body;

        // Validate data
        if (!category || !amount || amount <= 0) {
            res.status(400).json({ success: false, message: "Invalid data" });
            return;
        }

        // Fetch limits
        const limitData = await Limit.findOne();
        if (!limitData) {
            res.status(400).json({ success: false, message: "Set a spending limit first" });
            return;
        }

        // Check total limit
        const totalExpenses = await Expense.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const currentTotal = totalExpenses[0]?.total || 0;
        if (currentTotal + amount > limitData.totalLimit) {
            res.status(400).json({ success: false, message: "Monthly total limit exceeded" });
            return;
        }

        // Check category limit
        const categoryLimit = limitData.categoryLimits.find((cat) => cat.category === category);
        if (categoryLimit && amount > categoryLimit.limit) {
            res.status(400).json({ success: false, message: `Category limit for ${category} exceeded` });
            return;
        }

        // Add expense
        const newExpense = new Expense({ category, amount, description });
        await newExpense.save();
        res.status(201).json({ success: true, data: newExpense, message: "Expense added successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error adding expense", error: error.message });
    }
};

// Get daily summary
export const getDailySummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date } = req.query;

        // Filter expenses by date
        const dailyExpenses = await Expense.find({
            date: {
                $gte: new Date(date as string),
                $lte: new Date(date as string),
            },
        });

        const summary = dailyExpenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);

        res.status(200).json({ success: true, data: summary });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error retrieving summary", error: error.message });
    }
};

// Get current month's summary
export const getCurrentMonthSummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        // Aggregate expenses by date and category
        const currentMonthSummary = await Expense.aggregate([
            {
                $match: {
                    date: { $gte: startOfMonth, $lt: endOfMonth }, // Filter by current month
                },
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },
                        category: "$category",
                        purpose: "$purpose",
                    },
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id.date",
                    categories: {
                        $push: {
                            category: "$_id.category",
                            purpose: "$_id.purpose",
                            totalAmount: "$totalAmount",
                            count: "$count",
                        },
                    },
                },
            },
            {
                $sort: { _id: 1 }, // Sort by date
            },
        ]);

        // Format response
        const formattedSummary = currentMonthSummary.map((day) => {
            const dailySummary: Record<string, any> = { Date: day._id, Categories: [] };

            day.categories.forEach((cat: any) => {
                dailySummary.Categories.push({
                    category: cat.category,
                    totalAmount: cat.totalAmount,
                    count: cat.count,
                    details: `${cat.totalAmount}$ for ${cat.purpose}`,
                });
            });

            return dailySummary;
        });

        res.status(200).json({ success: true, data: currentMonthSummary });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Error retrieving monthly summary", error: error.message });
    }
};