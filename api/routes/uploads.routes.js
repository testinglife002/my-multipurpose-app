// routes/uploads.routes.js)
// routes/uploads.routes.js
import express from "express";
import multer from "multer";
import {
  uploadMedia,
  getUserMedias,
  uploadByCategory,
  getFilesByCategory,
  uploadMedias
} from "../controllers/upload.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});


// user library
// router.post("/", verifyToken, upload.single("file"), uploadMedia);
// router.get("/", verifyToken, getUserMedias);
router.post("/", verifyToken, uploadMedias);
router.get("/", verifyToken, getUserMedias);


// category uploads
router.post("/category", upload.single("file"), uploadByCategory);
router.get("/category/:category", getFilesByCategory);

export default router;


/*
import express from "express";
import multer from "multer";
import { uploadMedia, getUserMedias } from "../controllers/upload.controller.js";
import { uploadFile, getFilesByCategory } from "../controllers/upload.controller.js";
import uploading from "../middleware/uploading.js";
import { verifyToken } from "../middleware/auth.middleware.js";

import path from "path";
import fs from "fs";
import { uploadImage } from "../controllers/uploadController.js";




const router = express.Router();
const uploader = multer({ dest: "temp/" }); // temp folder for incoming uploads

router.post("/", uploader.single("image"), uploadImage);



router.post("/", uploading.single("file"), uploadFile);
router.get("/:category", getFilesByCategory);



// routes/upload.routes.js





const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/upload", verifyToken, upload.single("file"), uploadMedia);
router.get("/get", verifyToken, getUserMedias);

export default router;
*/

