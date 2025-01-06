import mongoose, { Schema, Document } from "mongoose";

export interface ICategoryLimit extends Document {
  category: string;  // ক্যাটাগরি
  limit: number;     // লিমিট
}

export interface ITotalLimit extends Document {
  totalLimit: number;   // মাসিক টোটাল লিমিট
  categoryLimits: ICategoryLimit[]; // প্রতিটি ক্যাটাগরির লিমিট
}

const categoryLimitSchema = new Schema<ICategoryLimit>({
  category: { type: String, required: true },
  limit: { type: Number, required: true },
});

const totalLimitSchema = new Schema<ITotalLimit>({
  totalLimit: { type: Number, required: true },
  categoryLimits: { type: [categoryLimitSchema], required: true },
});

const Limit = mongoose.model<ITotalLimit>("Limit", totalLimitSchema);
export default Limit;
