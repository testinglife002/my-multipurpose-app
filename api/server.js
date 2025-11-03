// api/server.js
// api/server.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env FIRST

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import http from "http";
import path from "path";
import { fileURLToPath } from "url"; // ✅
import { dirname } from "path"; // ✅

import connectDB from "./config/db.js";




// ========================
// Routes (keep your imports/structure)
// ========================
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import appRoutes from "./routes/app.routes.js";
import categoryRoute from "./routes/category.routes.js";
import channelRoute from "./routes/channel.routes.js";
import postRoute from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import noteRoute from "./routes/note.routes.js";
import todoRoute from "./routes/todo.routes.js";
import taskRoute from "./routes/task.routes.js";
import boardRoute from "./routes/board.routes.js";
import listRoute from "./routes/list.routes.js";
import cardRoute from "./routes/card.routes.js";
import notificationRoute from "./routes/notification.routes.js";
import emailTemplateRoutes from "./routes/emailTemplateRoutes.js";
import textTemplateRoutes from "./routes/textTemplate.routes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import whatsappRoutes from "./routes/whatsapp.routes.js";
import whatsappMessageRoutes from "./routes/whatsappMessageRoutes.js";
import whatsappSenderRoutes from "./routes/whatsappSender.routes.js";
import designRoutes from "./routes/designRoute.js";
import uploadRoutes from "./routes/upload.routes.js";
import uploadingRoutes from "./routes/uploads.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import ogRoutes from "./routes/ogRoutes.js";
import ogFetchRoutes from "./routes/ogFetchRoutes.js";
// import sendPulseRoutes from "./routes/sendPulseRoutes.js";


// ✅ Fix __dirname for ES Modules
// fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB(); // assumes config/db.js exports an async connect function

// server.js
 import "./cron.js"; // Make sure this is after DB connection

const app = express();


// ========================
// Security & rate limiting
// ========================
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // adjust up for production traffic if needed
  })
);




const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps, curl, Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed for: " + origin));
  },
  credentials: true,
}));


// ========================
// Body parsers, cookies, proxy
// ========================

app.use(express.json());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("trust proxy", 1);



// ✅ Serve static files (e.g., image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/apps", appRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/channels", channelRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoutes);
app.use("/api/notes", noteRoute);
app.use("/api/todos", todoRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/boards", boardRoute);
app.use("/api/lists", listRoute);
app.use("/api/cards", cardRoute);
app.use("/api/notifications", notificationRoute);
app.use("/api/templates", emailTemplateRoutes);
app.use("/api/text-templates", textTemplateRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/whatsapp-messages", whatsappMessageRoutes);
app.use("/api/whatsapp-sender", whatsappSenderRoutes);
app.use("/api", designRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/upload", uploadingRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/og", ogRoutes);
app.use("/og", ogFetchRoutes);
// app.use("/api/sendpulse", sendPulseRoutes);

// ========================
// Health check
// ========================
// ✅ Default API status check
app.get('/', (req, res) => {
  res.send('MERN Backend is Live! API is running...');
});

// ========================
// Serve client production build if present
// ========================
// if (process.env.NODE_ENV === "production") {
//  const clientPath = path.resolve(__dirname, "../client/dist");
//  app.use(express.static(clientPath));
//  app.get("*", (req, res) => res.sendFile(path.join(clientPath, "index.html")));
// }

// ========================
// Global error handler — ensure CORS headers on error responses
// ========================
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack); // ADD this
  console.error("Unhandled error:", err);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({ success: false, message: errorMessage });
});

// ========================
// Start server
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV})`);
});
