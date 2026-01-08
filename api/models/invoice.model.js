// 📄 backend/models/invoice.model.js

import mongoose from "mongoose";
import invoiceItemSchema from "./invoiceItem.schema.js";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      index: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: {
      type: [invoiceItemSchema],
      required: true,
    },

    subtotal: Number,
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: Number,

    status: {
      type: String,
      enum: ["draft", "sent", "paid", "overdue", "cancelled"],
      default: "draft",
      index: true,
    },

    dueDate: Date,

    pdfUrl: String,

    sentVia: {
      email: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", invoiceSchema);
  