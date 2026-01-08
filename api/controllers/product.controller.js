// 📄 backend/controllers/product.controller.js

import Product from "../models/product.model.js";
import createError from "../utils/createError.js";

/**
 * Create Product / Service
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, unit } = req.body;

    if (!name || !price)
      return next(createError(400, "Name and price required"));

    const product = await Product.create({
      name,
      description,
      price,
      unit,
      createdBy: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

/**
 * Get Products
 */
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
};

/**
 * Update Product
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) return next(createError(404, "Product not found"));

    res.json(product);
  } catch (err) {
    next(err);
  }
};
