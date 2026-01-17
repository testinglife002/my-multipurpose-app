// 📄 backend/scripts/seed/story01_b2b.js

import mongoose from "mongoose";
import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

const ADMIN_ID = new mongoose.Types.ObjectId("6900caadd62ba896649e265d");

export default async function seedStory01() {

  const product = await Product.findOne({ name: "Ergonomic Chair" });

  const lead = await Lead.create({
    name: "Rafiq Hasan",
    email: "rafiq@novaworkspace.com",
    phone: "+8801712345678",
    source: "website",
    status: "new",
    assignedTo: ADMIN_ID,
    createdBy: ADMIN_ID,
  });

  await SalesActivity.create({
    type: "call",
    message: "Discussed requirement for 20 ergonomic chairs",
    lead: lead._id,
    performedBy: ADMIN_ID,
  });

  const customer = await Customer.create({
    name: "Nova Workspace Ltd.",
    email: "accounts@novaworkspace.com",
    phone: "+8801712345678",
    company: "Nova Workspace Ltd.",
    address: "Dhaka, Bangladesh",
    taxNumber: "VAT-987654",
    sourceLead: lead._id,
    assignedTo: ADMIN_ID,
    createdBy: ADMIN_ID,
  });

  lead.status = "converted";
  lead.isConverted = true;
  lead.convertedCustomer = customer._id;
  await lead.save();

  const invoice = await Invoice.create({
    invoiceNumber: "INV-2025-001",
    customer: customer._id,
    items: [{
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: 20,
      total: 240000,
    }],
    subtotal: 240000,
    tax: 24000,
    discount: 0,
    total: 264000,
    status: "paid",
    dueDate: new Date(Date.now() + 15 * 86400000),
    createdBy: ADMIN_ID,
  });

  await SalesActivity.create({
    type: "invoice",
    message: "Invoice INV-2025-001 generated",
    customer: customer._id,
    invoice: invoice._id,
    performedBy: ADMIN_ID,
  });
}
