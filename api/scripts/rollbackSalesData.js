// backend/scripts/rollbackSalesData.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Promise.all([
  Lead.deleteMany({}),
  Customer.deleteMany({}),
  Invoice.deleteMany({}),
  SalesActivity.deleteMany({}),
]);

console.log("🧨 SALES DATA ROLLED BACK");
process.exit(0);
