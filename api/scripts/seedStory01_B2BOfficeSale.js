// 📄 api/scripts/seedStory01_B2BOfficeSale.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

dotenv.config();

/**
 * STORY 1 — B2B OFFICE EQUIPMENT SALE
 * Website Lead → Qualified → Converted → Paid Invoice
 */

const ADMIN_ID = "6900caadd62ba896649e265d"; // Admin / Sales Rep A

async function seedStory01() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🧹 Cleaning previous story data (safe)...");
    await Promise.all([
      Lead.deleteMany({ email: "rafiq@novaworkspace.com" }),
      Customer.deleteMany({ email: "accounts@novaworkspace.com" }),
      Invoice.deleteMany({ invoiceNumber: "INV-2025-001" }),
      SalesActivity.deleteMany({ message: /INV-2025-001|ergonomic/i }),
    ]);

    // 1️⃣ PRODUCT (Admin already created, ensure exists)
    console.log("📦 Ensuring product exists...");
    let chair = await Product.findOne({ name: "Ergonomic Chair" });

    if (!chair) {
      chair = await Product.create({
        name: "Ergonomic Chair",
        description: "Comfortable office chair",
        price: 12000,
        unit: "pcs",
        createdBy: ADMIN_ID,
      });
    }

    // 2️⃣ LEAD CREATION
    console.log("🎯 Creating lead...");
    const lead = await Lead.create({
      name: "Rafiq Hasan",
      email: "rafiq@novaworkspace.com",
      phone: "+8801712345678",
      source: "website",
      status: "new",
      assignedTo: ADMIN_ID,
      notes: "Requested pricing for office furniture",
      createdBy: ADMIN_ID,
    });

    // 3️⃣ SALES ACTIVITY — CALL
    console.log("📞 Logging sales call...");
    await SalesActivity.create({
      type: "call",
      message: "Discussed requirement for 20 ergonomic chairs",
      lead: lead._id,
      performedBy: ADMIN_ID,
    });

    // 4️⃣ QUALIFY LEAD
    console.log("✅ Qualifying lead...");
    lead.status = "qualified";
    await lead.save();

    // 5️⃣ CUSTOMER CREATION (CONVERSION)
    console.log("🏢 Creating customer...");
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
      status: "active",
    });

    // Update lead as converted
    lead.isConverted = true;
    lead.status = "converted";
    lead.convertedCustomer = customer._id;
    await lead.save();

    // 6️⃣ INVOICE CREATION (DRAFT → PAID)
    console.log("🧾 Creating invoice...");
    const subtotal = chair.price * 20;
    const tax = 24000;
    const total = subtotal + tax;

    const invoice = await Invoice.create({
      invoiceNumber: "INV-2025-001",
      customer: customer._id,
      items: [
        {
          product: chair._id,
          name: chair.name, // snapshot
          price: chair.price,
          quantity: 20,
          total: subtotal,
        },
      ],
      subtotal,
      tax,
      discount: 0,
      total,
      status: "draft",
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      createdBy: ADMIN_ID,
    });

    // 7️⃣ SALES ACTIVITY — INVOICE GENERATED
    console.log("📄 Logging invoice activity...");
    await SalesActivity.create({
      type: "invoice",
      message: "Invoice INV-2025-001 generated",
      customer: customer._id,
      invoice: invoice._id,
      performedBy: ADMIN_ID,
    });

    // 8️⃣ MARK INVOICE AS PAID
    console.log("💰 Marking invoice as paid...");
    invoice.status = "paid";
    await invoice.save();

    console.log("✅ STORY 1 SEEDED SUCCESSFULLY");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedStory01();
