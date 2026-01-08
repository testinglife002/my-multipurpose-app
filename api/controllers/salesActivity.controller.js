// 📄 backend/controllers/salesActivity.controller.js

import SalesActivity from "../models/salesActivity.model.js";

export const createSalesActivity = async (req, res, next) => {
  try {
    const activity = await SalesActivity.create({
      ...req.body,
      performedBy: req.user.id,
    });

    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
};

export const getActivities = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.invoiceId) filter.invoice = req.query.invoiceId;
    if (req.query.customerId) filter.customer = req.query.customerId;

    if (req.user.role !== "admin") {
      filter.performedBy = req.user.id;
    }

    const activities = await SalesActivity.find(filter)
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(activities);
  } catch (err) {
    next(err);
  }
};
