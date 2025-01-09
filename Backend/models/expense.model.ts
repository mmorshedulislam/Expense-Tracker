import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
    category: string;
    amount: number;
    purpose: string;
    date: Date;
    month: number;
    year: number;
}

const expenseSchema: Schema = new Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    date: { type: Date, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
}, { timestamps: true });

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
