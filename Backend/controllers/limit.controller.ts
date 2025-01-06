import { Request, Response } from "express";
import Limit from "../models/limit.model";

export const setLimits = async (req: Request, res: Response): Promise<void> => {
  try {
    const { totalLimit, categoryLimits } = req.body;

    if (!totalLimit || totalLimit <= 0 || !Array.isArray(categoryLimits)) {
      res.status(400).json({ success: false, message: "Invalid limits data" });
      return;
    }

    // Save or update limits
    const existingLimit = await Limit.findOne();
    if (existingLimit) {
      existingLimit.totalLimit = totalLimit;
      existingLimit.categoryLimits = categoryLimits;
      await existingLimit.save();
    } else {
      const newLimit = new Limit({ totalLimit, categoryLimits });
      await newLimit.save();
    }

    res.status(200).json({ success: true, message: "Limits set successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error setting limits", error: error.message });
  }
};
