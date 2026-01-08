// 📄 backend/controllers/salesPrediction.controller.js

import Invoice from "../models/invoice.model.js";
import SalesActivity from "../models/salesActivity.model.js";
import { predictInvoiceCloseProbability } from "../services/salesPrediction.service.js";

export const predictSales = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  const activities = await SalesActivity.find({ invoice: invoice._id });

  const probability = predictInvoiceCloseProbability(invoice, activities);

  res.json({
    invoiceId: invoice._id,
    probability,
    expectedRevenue: (invoice.total * probability) / 100,
  });
};
