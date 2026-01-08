// 📄 backend/routes/customer.routes.js

import express from "express";
import {
  convertLeadToCustomer,
  getCustomers,
} from "../controllers/customer.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
  POST  /api/customers/convert/:leadId  → Convert lead
  GET   /api/customers                  → List customers
*/

router.use(verifyToken);

router.post("/convert/:leadId", convertLeadToCustomer);
router.get("/", getCustomers);

export default router;
