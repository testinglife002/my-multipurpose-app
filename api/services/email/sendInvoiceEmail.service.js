// 📄 backend/services/email/sendInvoiceEmail.service.js

import nodemailer from "nodemailer";

export const sendInvoiceEmail = async ({ to, subject, text, pdfPath }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Sales" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    attachments: [
      {
        filename: "invoice.pdf",
        path: `public${pdfPath}`,
      },
    ],
  });
};
