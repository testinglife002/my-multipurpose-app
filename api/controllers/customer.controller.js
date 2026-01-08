// 📄 backend/controllers/customer.controller.js

import Lead from "../models/lead.model.js";
import Customer from "../models/customer.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

/**
 * Convert Lead to Customer
 */
export const convertLeadToCustomer = async (req, res, next) => {
  try {
    const { leadId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(leadId))
      return next(createError(400, "Invalid lead ID"));

    const lead = await Lead.findById(leadId);
    if (!lead) return next(createError(404, "Lead not found"));

    if (lead.isConverted)
      return next(createError(400, "Lead already converted"));

    const customer = await Customer.create({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      sourceLead: lead._id,
      assignedTo: lead.assignedTo,
      createdBy: req.user.id,
    });

    lead.isConverted = true;
    lead.status = "converted";
    lead.convertedCustomer = customer._id;
    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead converted to customer",
      customer,
    });
  } catch (err) {
    next(err);
  }
};



// 📄 backend/controllers/customer.controller.js (continued)

export const getCustomers = async (req, res, next) => {
  try {
    const filter = {};

    if (req.user.role !== "admin") {
      filter.assignedTo = req.user.id;
    }

    const customers = await Customer.find(filter)
      .populate("assignedTo", "username email")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json(customers);
  } catch (err) {
    next(err);
  }
};


