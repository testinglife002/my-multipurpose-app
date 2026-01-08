// 📄 backend/services/salesPrediction.service.js

export const predictInvoiceCloseProbability = (invoice, activities) => {
  let score = 0;

  score += activities.length * 5;

  if (invoice.sentVia?.email) score += 10;
  if (invoice.sentVia?.whatsapp) score += 15;

  const daysOpen =
    (Date.now() - new Date(invoice.createdAt)) / (1000 * 60 * 60 * 24);

  if (daysOpen < 3) score += 20;
  else if (daysOpen > 14) score -= 10;

  return Math.min(100, Math.max(0, score));
};
