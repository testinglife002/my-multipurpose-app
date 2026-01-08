// 📄 backend/controllers/lead.controller.js

import Lead from "../models/lead.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

/**
 * Create Lead
 */
export const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, source, notes, assignedTo } = req.body;
    const userId = req.user?.id;

    if (!name) return next(createError(400, "Lead name is required"));

    const lead = await Lead.create({
      name,
      email,
      phone,
      source,
      notes,
      assignedTo: assignedTo || null,
      createdBy: userId,
    });

    res.status(201).json({ success: true, lead });
  } catch (err) {
    next(err);
  }
};

/**
 * Get All Leads (Admin / Sales)
 */
export const getLeads = async (req, res, next) => {
  try {
    const filter = {};
    const userId = req.user?.id;
    // Sales users only see assigned leads
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user.id;
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "username email")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (err) {
    next(err);
  }
};

/**
 * Get Single Lead
 */
export const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(createError(400, "Invalid lead ID"));

    const lead = await Lead.findById(id)
      .populate("assignedTo", "username email")
      .populate("createdBy", "username");

    if (!lead) return next(createError(404, "Lead not found"));

    res.json(lead);
  } catch (err) {
    next(err);
  }
};

/**
 * Update Lead
 */
export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!lead) return next(createError(404, "Lead not found"));

    res.json({ success: true, lead });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete Lead
 */
export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) return next(createError(404, "Lead not found"));

    res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    next(err);
  }
};
