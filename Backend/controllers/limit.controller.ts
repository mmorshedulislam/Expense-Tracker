import { Request, Response } from "express";
import Limit from "../models/limit.model";

// Set or Update Limit
export const setLimit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, limit } = req.body;

    // Current month and year
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Upsert (update or insert) limit
    const updatedLimit = await Limit.findOneAndUpdate(
      { category, month, year },
      { limit },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, message: `${category} Limit Updated Successfully`, data: updatedLimit, });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error setting limit", error: error.message });
  }
};

// Get all limits
export const getLimits = async (_req: Request, res: Response): Promise<void> => {
  try {
    const limits = await Limit.find();
    res.status(200).json({ success: true, data: limits });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error fetching limits", error: error.message });
  }
};

// Delete a limit
export const deleteLimit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedLimit = await Limit.findByIdAndDelete(id);
    if (!deletedLimit) {
      res.status(404).json({ success: false, message: "Limit not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Limit deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error deleting limit", error: error.message });
  }
};
