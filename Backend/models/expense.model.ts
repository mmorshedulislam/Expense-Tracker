import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  category: string; // ক্যাটাগরি যেমন Groceries, Transportation ইত্যাদি
  amount: number;   // খরচের পরিমাণ
  description: string; // খরচের উদ্দেশ্য
  date: Date;       // খরচের তারিখ
}

const expenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
