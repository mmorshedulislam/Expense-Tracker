import express from "express";
import { createExpense, getExpenses, getExpenseById, deleteExpense, getMonthlySummary, getDailySummary, getCategoryUsage } from "../controllers/expense.controller";

const router = express.Router();

router.get("/monthly-summary", getMonthlySummary);
router.get("/daily-summary", getDailySummary);
router.get("/category-usage", getCategoryUsage);
router.post("/", createExpense);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.delete("/:id", deleteExpense);
export default router;
