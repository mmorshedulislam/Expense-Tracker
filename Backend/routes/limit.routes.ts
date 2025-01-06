import { Router } from "express";
import { setLimits } from "../controllers/limit.controller";

const router: Router = Router();

router.post("/", setLimits);

export default router;
