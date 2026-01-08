// 📄 backend/routes/lead.routes.js
import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
  POST    /api/leads        → Create lead
  GET     /api/leads        → Get all leads
  GET     /api/leads/:id    → Get single lead
  PUT     /api/leads/:id    → Update lead
  DELETE  /api/leads/:id    → Delete lead
*/

router.use(verifyToken);

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
