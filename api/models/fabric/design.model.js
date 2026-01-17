// models/fabric/design.model.js
// models/fabric/DesignFabric.js
import mongoose from "mongoose";


const designSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      default: "Untitled Design",
      trim: true,
    },

    canvasData: {
      type: String, // JSON string
      default: "",
    },

    width: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      default: "general",
      index: true,
    },
  },
  {
    timestamps: true, // replaces createdAt + updatedAt
  }
);


// const Designz = mongoose.model('Designz', designSchema);
// export default Designz;
// const Designz =
//  mongoose.models.Designz || mongoose.model("Designz", designSchema);
export default mongoose.models.Designz ||
  mongoose.model("Designz", designSchema, "designz");




