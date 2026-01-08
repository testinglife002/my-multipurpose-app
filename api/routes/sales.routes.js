// 📄 backend/routes/sales.routes.js

import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { getSalesDashboard } from "../controllers/salesDashboard.controller.js";
import { createSalesActivity, getActivities } from "../controllers/salesActivity.controller.js";
import { createSalesTarget, getSalesTargets } from "../controllers/salesTarget.controller.js";
import { predictSales } from "../controllers/salesPrediction.controller.js";

const router = express.Router();

router.use(verifyToken);

router.get("/dashboard", getSalesDashboard);
router.post("/activities", createSalesActivity);
router.get("/activities", getActivities);
router.post("/targets", createSalesTarget);
router.get("/targets", getSalesTargets);
router.get("/predict/:id", predictSales);

export default router;
