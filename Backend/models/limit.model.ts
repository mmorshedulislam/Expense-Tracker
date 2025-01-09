import mongoose, { Schema, Document } from "mongoose";

export interface ILimit extends Document {
    category: string;
    limit: number;
    month: number;
    year: number;
}

const limitSchema: Schema = new Schema({
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },
});

const Limit = mongoose.model<ILimit>("Limit", limitSchema);
export default Limit;
