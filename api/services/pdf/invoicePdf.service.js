// 📄 backend/services/pdf/invoicePdf.service.js

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = async (invoice, customer) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const fileName = `invoice-${invoice.invoiceNumber}.pdf`;
      const filePath = path.join("public/uploads/invoices", fileName);

      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      doc.pipe(fs.createWriteStream(filePath));

      // Header
      doc.fontSize(20).text("INVOICE", { align: "right" });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice #: ${invoice.invoiceNumber}`);
      doc.text(`Date: ${new Date(invoice.createdAt).toDateString()}`);
      doc.text(`Due Date: ${invoice.dueDate?.toDateString() || "-"}`);
      doc.moveDown();

      // Customer
      doc.fontSize(14).text("Bill To:");
      doc.fontSize(12).text(customer.name);
      if (customer.email) doc.text(customer.email);
      if (customer.phone) doc.text(customer.phone);
      doc.moveDown();

      // Table Header
      doc.fontSize(12).text("Items:");
      doc.moveDown(0.5);

      invoice.items.forEach((item) => {
        doc.text(
          `${item.name} — ${item.quantity} × ${item.price} = ${item.total}`
        );
      });

      doc.moveDown();

      // Totals
      doc.text(`Subtotal: ${invoice.subtotal}`);
      doc.text(`Tax: ${invoice.tax}`);
      doc.text(`Discount: ${invoice.discount}`);
      doc.fontSize(14).text(`Total: ${invoice.total}`, { underline: true });

      doc.end();

      resolve(`/uploads/invoices/${fileName}`);
    } catch (err) {
      reject(err);
    }
  });
};
