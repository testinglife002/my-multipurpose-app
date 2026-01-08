// 📄 backend/controllers/salesDashboard.controller.js

import Invoice from "../models/invoice.model.js";
import SalesTarget from "../models/salesTarget.model.js";

export const getSalesDashboard = async (req, res) => {
  const match = req.user.role === "admin"
    ? {}
    : { createdBy: req.user.id };

  const invoices = await Invoice.find(match);

  const totalRevenue = invoices
    .filter(i => i.status === "paid")
    .reduce((sum, i) => sum + i.total, 0);

  const sentInvoices = invoices.filter(i => i.status !== "draft").length;
  const paidInvoices = invoices.filter(i => i.status === "paid").length;

  const conversionRate =
    sentInvoices > 0 ? (paidInvoices / sentInvoices) * 100 : 0;

  const currentMonth = new Date().toISOString().slice(0, 7);

  const target = await SalesTarget.findOne({
    user: req.user.id,
    month: currentMonth,
  });

  res.json({
    totalRevenue,
    invoicesSent: sentInvoices,
    invoicesPaid: paidInvoices,
    conversionRate: Number(conversionRate.toFixed(2)),
    targetAmount: target?.targetAmount || 0,
    targetAchieved: target
      ? Math.min(100, (totalRevenue / target.targetAmount) * 100)
      : 0,
  });
};
