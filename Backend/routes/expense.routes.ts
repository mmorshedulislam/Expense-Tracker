import { Router } from "express";
import { addExpense, getDailySummary } from "../controllers/expense.controller";

const router: Router = Router();

router.post("/", addExpense);
router.get("/summary", getDailySummary);

export default router;
