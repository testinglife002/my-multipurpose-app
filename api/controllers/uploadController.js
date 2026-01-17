// controllers/uploadController.js
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";

import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadMediaToCloudinary(req.file);

    return res.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

