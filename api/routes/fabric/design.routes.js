// routes/fabric/design.routes.js
import express from "express";
import { verifyToken } from "../../middleware/auth.middleware.js";

import {
  getAllDesigns,
  getUserDesigns,
  getUserDesignById,
  saveDesign,
  deleteDesign
} from "../../controllers/fabric/designsController.js";

const router = express.Router();

// ALL routes require auth
router.use(verifyToken);

// admin / public
router.get("/all", getAllDesigns);

// user dashboard
router.get("/", getUserDesigns);

// single design
router.get("/:id", getUserDesignById);

// create or update
router.post("/", saveDesign);

// delete
router.delete("/:id", deleteDesign);

export default router;

