import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.routes";
import limitRoutes from "./routes/limit.routes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "YAY! it's working!" });
});

// Routes
app.use("/api/limits", limitRoutes);
app.use("/api/expenses", expenseRoutes);

// Route not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
  next();
});

export default app;
