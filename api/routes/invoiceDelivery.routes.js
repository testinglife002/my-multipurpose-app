// 📄 backend/routes/invoiceDelivery.routes.js

import express from "express";
import { sendInvoice } from "../controllers/invoiceSend.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
  POST /api/invoices/:id/send
  body: { via: "email" | "whatsapp" }
*/

router.use(verifyToken);
router.post("/:id/send", sendInvoice);

export default router;
