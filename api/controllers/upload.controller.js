// controllers/upload.controller.js)
// controllers/upload.controller.js
import formidable from 'formidable';
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import Media from "../models/media.model.js";
import Upload from "../models/upload.model.js";
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export const uploadMedias = async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ success:false, message:"Unauthorized" });
  }

  const form = formidable({ multiples:false });

  try {
    const [fields, files] = await form.parse(req);

    const image = files.file || files.image;
    if (!image) return res.status(400).json({ success:false, message:"No file" });

    const uploadResult = await cloudinary.uploader.upload(
      image[0].filepath,
      { folder:"media" }
    );

    const media = await Media.create({
      userId: req.user.id,
      name: image[0].originalFilename,
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.secure_url,
      mimeType: image[0].mimetype,
      size: image[0].size,
      width: uploadResult.width,
      height: uploadResult.height,
    });

    res.status(201).json({ success:true, data: media });

  } catch(err){
    console.error(err);
    res.status(500).json({ success:false, message: err.message });
  }
};


export const getUserMedia = async (req, res) => {
  const medias = await Media.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: medias });
};



export const uploadMedia = async (req, res) => {
  try {
    console.log("STEP 1: Controller entered");

    if (!req.user?.id) {
      return res.status(401).json({ success:false, message:"Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ success:false, message:"No file uploaded" });
    }

    console.log("STEP 2: File received:", req.file.originalname);
    console.log("BUFFER SIZE:", req.file.buffer?.length);

    console.log("STEP 3: Calling Cloudinary...");
    const result = await uploadMediaToCloudinary(req.file);

    console.log("STEP 4: Cloudinary done:", result.secure_url);

    const media = await Media.create({
      userId: req.user.id,
      name: req.file.originalname,
      cloudinaryId: result.public_id,
      url: result.secure_url,
      mimeType: req.file.mimetype,
      size: req.file.size,
      width: result.width || null,
      height: result.height || null,
    });

    console.log("STEP 5: Mongo saved:", media._id);

    return res.status(201).json({
      success: true,
      data: media,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};









// get user media
export const getUserMedias = async (req, res) => {
  console.log(req.body);
console.log(req.file);

  const medias = await Media.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({
  success: true,
  data: medias
});

};

// upload by category
export const uploadByCategory = async (req, res) => {
  console.log(req.body);
console.log(req.file);

  const result = await uploadMediaToCloudinary(req.file);

  const upload = await Upload.create({
    url: result.secure_url,
    public_id: result.public_id,
    category: req.body.category,
  });

  res.json({ success: true, data: upload });
};

// get by category
export const getFilesByCategory = async (req, res) => {
  console.log(req.body);
console.log(req.file);

  const uploads = await Upload.find({ category: req.params.category });
  res.json({ success: true, data: uploads });
};



/*
// controllers/upload.controller.js
import Media from "../models/media.model.js";
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";
import Upload from "../models/upload.model.js"; // store in DB

// Upload a single file
export const uploadFile = async (req, res) => {
  try {
    const { category } = req.body; // e.g. "image", "template", "background"
    const fileUrl = req.file.path;

    const newUpload = await Upload.create({
      url: fileUrl,
      category,
      public_id: req.file.filename,
    });

    res.status(200).json({ success: true, data: newUpload });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Load files dynamically by category
export const getFilesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const uploads = await Upload.find({ category });
    res.status(200).json({ success: true, data: uploads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




export const uploadMedia = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const cloudinaryResult = await uploadMediaToCloudinary(req.file);

    const media = await Media.create({
      userId: req.user.id,
      name: req.file.originalname,
      cloudinaryId: cloudinaryResult.public_id,
      url: cloudinaryResult.secure_url,
      mimeType: req.file.mimetype,
      size: req.file.size,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
    });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const getUserMedias = async (req, res) => {
  try {
    const medias = await Media.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: medias });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};
*/


