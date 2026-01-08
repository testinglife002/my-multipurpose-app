// 📄 backend/controllers/salesTarget.controller.js

import SalesTarget from "../models/salesTarget.model.js";
import createError from "../utils/createError.js";

export const createSalesTarget = async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(createError(403, "Only admin can assign targets"));

  const { user, month, targetAmount } = req.body;

  const target = await SalesTarget.create({
    user,
    month,
    targetAmount,
    createdBy: req.user.id,
  });

  res.status(201).json(target);
};

export const getSalesTargets = async (req, res) => {
  const filter = req.user.role === "admin"
    ? {}
    : { user: req.user.id };

  const targets = await SalesTarget.find(filter)
    .populate("user", "username");

  res.json(targets);
};
