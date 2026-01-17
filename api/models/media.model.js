// models/media.model.js
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    width: Number,
    height: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Media ||
  mongoose.model("Media", mediaSchema, "media");
