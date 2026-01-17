// 📄 backend/scripts/seed/story02_saas.js
// STORY 2 — Subscription SaaS (Email Lead → Paid Invoice)
import mongoose from "mongoose";
import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

const ADMIN_ID = new mongoose.Types.ObjectId("6900caadd62ba896649e265d");

export default async function seedStory02() {
  // Ensure product exists
  let product = await Product.findOne({ name: "CloudSuite Pro Subscription" });

  if (!product) {
    product = await Product.create({
      name: "CloudSuite Pro Subscription",
      description: "Monthly SaaS subscription",
      price: 5000,
      unit: "month",
      createdBy: ADMIN_ID,
    });
  }

  // Lead
  const lead = await Lead.create({
    name: "Arif Khan",
    email: "founder@cloudsuite.io",
    phone: "+8801811122233",
    source: "email",
    status: "new",
    assignedTo: ADMIN_ID,
    notes: "Interested in SaaS subscription",
    createdBy: ADMIN_ID,
  });

  // Sales activity: email follow-up
  await SalesActivity.create({
    type: "email",
    message: "Responded to SaaS pricing inquiry",
    lead: lead._id,
    performedBy: ADMIN_ID,
  });

  // Convert to customer
  const customer = await Customer.create({
    name: "CloudSuite Ltd.",
    email: "billing@cloudsuite.io",
    phone: "+8801811122233",
    company: "CloudSuite Ltd.",
    address: "Dhaka, Bangladesh",
    sourceLead: lead._id,
    assignedTo: ADMIN_ID,
    createdBy: ADMIN_ID,
    status: "active",
  });

  lead.status = "converted";
  lead.isConverted = true;
  lead.convertedCustomer = customer._id;
  await lead.save();

  // Invoice (paid subscription)
  const invoice = await Invoice.create({
    invoiceNumber: "INV-SAAS-2025-001",
    customer: customer._id,
    items: [
      {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: 5000,
      },
    ],
    subtotal: 5000,
    tax: 500,
    discount: 0,
    total: 5500,
    status: "paid",
    dueDate: new Date(),
    createdBy: ADMIN_ID,
  });

  // Sales activity: invoice
  await SalesActivity.create({
    type: "invoice",
    message: "First SaaS subscription invoice paid",
    customer: customer._id,
    invoice: invoice._id,
    performedBy: ADMIN_ID,
  });
}

