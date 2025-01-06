import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || "8000", 10);

const connectMongoose = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_DB) {
      throw new Error("MONGO_DB environment variable is not defined.");
    }
    await mongoose.connect(process.env.MONGO_DB);
    console.log("DB connected successfully");
  } catch (error: any) {
    console.error("Connection failed:", error.message);
  }
};

connectMongoose();

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
