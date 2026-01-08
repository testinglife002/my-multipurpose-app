// 📄 backend/models/salesTarget.model.js

import mongoose from "mongoose";

const salesTargetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    month: {
      type: String, // YYYY-MM
      required: true,
      index: true,
    },

    targetAmount: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

salesTargetSchema.index({ user: 1, month: 1 }, { unique: true });

export default mongoose.models.SalesTarget ||
  mongoose.model("SalesTarget", salesTargetSchema);
  