// 📄 backend/routes/invoice.routes.js

import express from "express";
import {
  createInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoice.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
  POST   /api/invoices       → Create draft invoice
  GET    /api/invoices       → List invoices
  PUT    /api/invoices/:id   → Update draft invoice
*/

router.use(verifyToken);

router.post("/", createInvoice);
router.get("/", getInvoices);
router.put("/:id", updateInvoice);

export default router;
