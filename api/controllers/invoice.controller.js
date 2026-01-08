// 📄 backend/controllers/invoice.controller.js

import Invoice from "../models/invoice.model.js";
import Customer from "../models/customer.model.js";
import createError from "../utils/createError.js";
import { generateInvoiceNumber } from "../utils/invoiceNumber.js";
import Product from "../models/product.model.js";

/**
 * Create Invoice (Draft)
 */
export const createInvoice = async (req, res, next) => {
  try {
    const { customerId, items, tax, discount, dueDate } = req.body;

    if (!items?.length)
      return next(createError(400, "Invoice items required"));

    const invoiceItems = [];

    for (const item of items) {
      if (item.productId) {
        const product = await Product.findById(item.productId);
        if (!product)
          return next(createError(404, "Product not found"));

        invoiceItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          total: product.price * item.quantity,
        });
      } else {
        // Custom item fallback
        invoiceItems.push({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        });
      }
    }

    const subtotal = invoiceItems.reduce((s, i) => s + i.total, 0);
    const total = subtotal + (tax || 0) - (discount || 0);

    // create invoice (same as before)


    const invoice = await Invoice.create({
        invoiceNumber: generateInvoiceNumber(),
        customer: customerId,
        items: invoiceItems,
        subtotal,
        tax,
        discount,
        total,
        dueDate,
        createdBy: req.user.id,
    });


    res.status(201).json({ success: true, invoice });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Invoices
 */
export const getInvoices = async (req, res, next) => {
  try {
    const filter = {};

    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
    }

    const invoices = await Invoice.find(filter)
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

/**
 * Update Invoice (Draft only)
 */
export const updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return next(createError(404, "Invoice not found"));

    if (invoice.status !== "draft")
      return next(createError(400, "Only draft invoices can be edited"));

    Object.assign(invoice, req.body);
    await invoice.save();

    res.json({ success: true, invoice });
  } catch (err) {
    next(err);
  }
};
