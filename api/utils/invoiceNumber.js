// 📄 backend/utils/invoiceNumber.js

export const generateInvoiceNumber = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);

  return `INV-${yyyy}${mm}-${random}`;
};
