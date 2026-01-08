// 📄 backend/routes/product.routes.js

import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
  POST   /api/products
  GET    /api/products
  PUT    /api/products/:id
*/

router.use(verifyToken);

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);

export default router;
