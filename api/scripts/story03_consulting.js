// 📄 backend/scripts/seed/story03_consulting.js
// STORY 3 — Service-Based Consulting (Meeting → Sent Invoice)
import mongoose from "mongoose";
import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

const ADMIN_ID = new mongoose.Types.ObjectId("6900caadd62ba896649e265d");

export default async function seedStory03() {
  // Ensure consulting service exists
  let service = await Product.findOne({ name: "Business Consulting Hour" });

  if (!service) {
    service = await Product.create({
      name: "Business Consulting Hour",
      description: "Professional consulting service",
      price: 3000,
      unit: "hour",
      createdBy: ADMIN_ID,
    });
  }

  // Lead
  const lead = await Lead.create({
    name: "Tanvir Ahmed",
    email: "ceo@visionconsult.com",
    phone: "+8801912345678",
    source: "manual",
    status: "qualified",
    assignedTo: ADMIN_ID,
    notes: "Needs business process consulting",
    createdBy: ADMIN_ID,
  });

  // Sales activity: meeting
  await SalesActivity.create({
    type: "meeting",
    message: "Initial consulting discovery meeting",
    lead: lead._id,
    performedBy: ADMIN_ID,
  });

  // Convert to customer
  const customer = await Customer.create({
    name: "Vision Consulting Ltd.",
    email: "finance@visionconsult.com",
    phone: "+8801912345678",
    company: "Vision Consulting Ltd.",
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

  // Invoice (sent, not paid yet)
  const invoice = await Invoice.create({
    invoiceNumber: "INV-CONSULT-2025-001",
    customer: customer._id,
    items: [
      {
        product: service._id,
        name: service.name,
        price: service.price,
        quantity: 40,
        total: 120000,
      },
    ],
    subtotal: 120000,
    tax: 12000,
    discount: 0,
    total: 132000,
    status: "sent",
    dueDate: new Date(Date.now() + 10 * 86400000),
    createdBy: ADMIN_ID,
  });

  // Sales activity: invoice created
  await SalesActivity.create({
    type: "invoice",
    message: "Consulting invoice sent to client",
    customer: customer._id,
    invoice: invoice._id,
    performedBy: ADMIN_ID,
  });
}
