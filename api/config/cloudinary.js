import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cloudinary v1 configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ Export cloudinary directly (NO .v2)
export default cloudinary;
