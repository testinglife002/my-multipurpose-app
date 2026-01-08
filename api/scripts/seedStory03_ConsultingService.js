// backend/scripts/seedStory03_ConsultingService.js



import mongoose from "mongoose";
import dotenv from "dotenv";

import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

dotenv.config();

const ADMIN_ID = "6900caadd62ba896649e265d";

async function seedStory03() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Promise.all([
      Lead.deleteMany({ email: "ceo@visionconsult.com" }),
      Customer.deleteMany({ email: "finance@visionconsult.com" }),
      Invoice.deleteMany({ invoiceNumber: /^INV-CONSULT-/ }),
    ]);

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

    const lead = await Lead.create({
      name: "Tanvir Ahmed",
      email: "ceo@visionconsult.com",
      phone: "+8801912345678",
      source: "manual",
      status: "qualified",
      assignedTo: ADMIN_ID,
      createdBy: ADMIN_ID,
    });

    const customer = await Customer.create({
      name: "Vision Consulting Ltd.",
      email: "finance@visionconsult.com",
      phone: "+8801912345678",
      company: "Vision Consulting Ltd.",
      sourceLead: lead._id,
      assignedTo: ADMIN_ID,
      createdBy: ADMIN_ID,
    });

    lead.isConverted = true;
    lead.status = "converted";
    lead.convertedCustomer = customer._id;
    await lead.save();

    const invoice = await Invoice.create({
      invoiceNumber: "INV-CONSULT-2025-001",
      customer: customer._id,
      items: [{
        product: service._id,
        name: service.name,
        price: 3000,
        quantity: 40,
        total: 120000,
      }],
      subtotal: 120000,
      tax: 12000,
      total: 132000,
      status: "sent",
      dueDate: new Date(Date.now() + 10 * 86400000),
      createdBy: ADMIN_ID,
    });

    await SalesActivity.create({
      type: "meeting",
      message: "Consulting project kickoff and delivery",
      customer: customer._id,
      invoice: invoice._id,
      performedBy: ADMIN_ID,
    });

    console.log("✅ STORY 3 SEEDED");
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedStory03();
