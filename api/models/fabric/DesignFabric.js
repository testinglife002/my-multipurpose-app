// models/fabric/Design.js
import mongoose from "mongoose";

const designFabricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    jsonTemplate: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    imagePreview: {
      type: String,
      default: null
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("DesignFabric", designFabricSchema);
