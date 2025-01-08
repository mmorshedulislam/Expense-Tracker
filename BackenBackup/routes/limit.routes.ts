import express from "express";
import { setLimit, getLimits, deleteLimit } from "../controllers/limit.controller";

const router = express.Router();

router.post("/", setLimit);
router.get("/", getLimits);
router.delete("/:id", deleteLimit);

export default router;
