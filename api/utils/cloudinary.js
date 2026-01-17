// Cloudinary config (utils/cloudinary.js)
// utils/cloudinary.js
// server/utils/cloudinary.js
// utils/cloudinary.js
// import cloudinary from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();
/*
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Optional: to ensure HTTPS URLs
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadMediaToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
      // { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
};

export default cloudinary;
*/


import cloudinary from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadMediaToCloudinary = (file) => {
  return new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "user_uploads",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary callback error:", error);
          return reject(error);
        }

        console.log("✅ Cloudinary uploaded:", result.secure_url);
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};
