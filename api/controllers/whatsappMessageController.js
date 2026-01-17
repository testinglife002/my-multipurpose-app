// Controller – whatsappMessageController.js
// controllers/whatsappMessageController.js
// import WhatsAppMessage from "../models/WhatsAppMessage.js";
// import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import WhatsAppMessage from "../models/WhatsAppMessage.js";
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";

const splitMessage = (text) => {
  const maxLength = 1600;
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + maxLength));
    start += maxLength;
  }
  return chunks;
};

const sendWhatsAppAPI = async ({ to, body, mediaUrls, type }) => {
  return { success: true };
};

export const sendMessage = async (req, res) => {
  try {
    const { to, body, type = "text", templateId, userId } = req.body;

    if (!to) {
      return res.status(400).json({ success: false, error: "Recipient required" });
    }

    let mediaUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadRes = await uploadMediaToCloudinary(file);
        mediaUrls.push(uploadRes.secure_url);
      }
    }

    const textChunks = splitMessage(body || "");
    const results = [];

    for (const chunk of textChunks) {
      const sendResult = await sendWhatsAppAPI({ to, body: chunk, mediaUrls, type });

      const messageDoc = await WhatsAppMessage.create({
        to,
        body: chunk,
        type,
        mediaUrls,
        templateId: templateId || null,
        userId: userId || null,
        status: sendResult.success ? "sent" : "failed",
        error: sendResult.success ? null : "Send failed",
      });

      results.push({
        messageId: messageDoc._id,
        status: messageDoc.status,
        body: chunk,
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      messages: results,
    });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Controller: Get all messages (optional)
// Controller: Fetch all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await WhatsAppMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller: Get single message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await WhatsAppMessage.findById(id);
    if (!message) {
      return res.status(404).json({ success: false, error: "Message not found." });
    }
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


