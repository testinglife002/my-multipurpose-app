// backend/scripts/seedStory02_SaaSSubscription.js

import mongoose from "mongoose";
import dotenv from "dotenv";

import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";

dotenv.config();

const ADMIN_ID = "6900caadd62ba896649e265d";

async function seedStory02() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🧹 Cleaning Story 2 data...");
    await Promise.all([
      Lead.deleteMany({ email: "founder@cloudsuite.io" }),
      Customer.deleteMany({ email: "billing@cloudsuite.io" }),
      Invoice.deleteMany({ invoiceNumber: /^INV-SAAS-/ }),
      SalesActivity.deleteMany({ message: /CloudSuite/i }),
    ]);

    // Product (Subscription)
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
    });

    lead.status = "converted";
    lead.isConverted = true;
    lead.convertedCustomer = customer._id;
    await lead.save();

    // Invoice (Monthly)
    const invoice = await Invoice.create({
      invoiceNumber: "INV-SAAS-2025-001",
      customer: customer._id,
      items: [{
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: 5000,
      }],
      subtotal: 5000,
      tax: 500,
      total: 5500,
      status: "paid",
      dueDate: new Date(),
      createdBy: ADMIN_ID,
    });

    await SalesActivity.create({
      type: "invoice",
      message: "First SaaS subscription invoice paid",
      invoice: invoice._id,
      customer: customer._id,
      performedBy: ADMIN_ID,
    });

    console.log("✅ STORY 2 SEEDED");
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedStory02();
