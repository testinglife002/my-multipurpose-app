// 📄 backend/models/invoiceItem.schema.js
import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    name: String,       // snapshot (important!)
    price: Number,      // snapshot
    quantity: Number,

    total: Number,
  },
  { _id: false }
);

export default invoiceItemSchema;

