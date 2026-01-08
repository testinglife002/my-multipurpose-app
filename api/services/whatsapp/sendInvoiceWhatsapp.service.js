// 📄 backend/services/whatsapp/sendInvoiceWhatsapp.service.js

import axios from "axios";

export const sendInvoiceWhatsapp = async ({ phone, message, pdfUrl }) => {
  // Example using your existing WhatsApp API infra
  await axios.post(process.env.WHATSAPP_API_URL, {
    phone,
    message: `${message}\nInvoice: ${process.env.APP_URL}${pdfUrl}`,
  });
};
