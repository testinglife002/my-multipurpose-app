// 📄 backend/models/salesActivity.model.js

import mongoose from "mongoose";

const salesActivitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["call", "email", "whatsapp", "meeting", "note", "invoice"],
      required: true,
      index: true,
    },

    message: String,

    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SalesActivity ||
  mongoose.model("SalesActivity", salesActivitySchema);
  