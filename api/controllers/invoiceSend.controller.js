// 📄 backend/controllers/invoiceSend.controller.js

import Invoice from "../models/invoice.model.js";
import Customer from "../models/customer.model.js";
import { generateInvoicePDF } from "../services/pdf/invoicePdf.service.js";
import { sendInvoiceEmail } from "../services/email/sendInvoiceEmail.service.js";
import { sendInvoiceWhatsapp } from "../services/whatsapp/sendInvoiceWhatsapp.service.js";
import createError from "../utils/createError.js";

export const sendInvoice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { via } = req.body; // email | whatsapp

    const invoice = await Invoice.findById(id);
    if (!invoice) return next(createError(404, "Invoice not found"));

    const customer = await Customer.findById(invoice.customer);
    if (!customer) return next(createError(404, "Customer not found"));

    // Generate PDF if missing
    if (!invoice.pdfUrl) {
      invoice.pdfUrl = await generateInvoicePDF(invoice, customer);
    }

    if (via === "email") {
      if (!customer.email)
        return next(createError(400, "Customer email missing"));

      await sendInvoiceEmail({
        to: customer.email,
        subject: `Invoice ${invoice.invoiceNumber}`,
        text: "Please find your invoice attached.",
        pdfPath: invoice.pdfUrl,
      });

      invoice.sentVia.email = true;
    }

    if (via === "whatsapp") {
      if (!customer.phone)
        return next(createError(400, "Customer phone missing"));

      await sendInvoiceWhatsapp({
        phone: customer.phone,
        message: `Invoice ${invoice.invoiceNumber}`,
        pdfUrl: invoice.pdfUrl,
      });

      invoice.sentVia.whatsapp = true;
    }

    invoice.status = "sent";
    await invoice.save();

    res.json({ success: true, invoice });
  } catch (err) {
    next(err);
  }
};
