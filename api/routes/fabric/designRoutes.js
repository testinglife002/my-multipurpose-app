// routes/fabric/designRoutes.js
import express from "express";
import { verifyToken } from "../../middleware/auth.middleware.js";
import { 
  createDesign,
  getAllDesigns,
  getMyDesigns,
  getDesignById,
  saveDesign
} from "../../controllers/fabric/designController.js";
/*
import {
  createDesign,
  getAllDesigns,
  getMyDesigns,
  getDesignById,
  saveDesign
} from "../../controllers/fabric/designController.js";
 */

const router = express.Router();

// Create new design
router.post("/", verifyToken, createDesign);

// Show ALL designs
router.get("/", verifyToken, getAllDesigns);

// Show logged-in user's designs
router.get("/my", verifyToken, getMyDesigns);

// Show single design
router.get("/:id", verifyToken, getDesignById);

router.put("/:id/save", verifyToken, saveDesign);

export default router;
