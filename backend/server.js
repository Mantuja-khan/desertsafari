import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import { seedDatabase } from "./config/seed.js";
import blogRoutes from "./routes/blogRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { getStats } from "./controllers/authController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    seedDatabase();
  })
  .catch((err) => {
    console.error("MongoDB init error:", err);
  });

// CORS configuration to allow local frontend and remote origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsers
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Serve Uploaded Media
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Endpoints
app.use("/api/blogs", blogRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/stats", getStats);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Desert Journey DXB Backend API (MongoDB)",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root API welcome
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Desert Journey DXB MongoDB API</title></head>
      <body style="font-family: system-ui, sans-serif; background: #0D3B33; color: #fff; padding: 40px; text-align: center;">
        <h1 style="color: #E4B564;">🌴 Desert Journey DXB - MongoDB Backend API</h1>
        <p style="color: #ccc;">Backend service is running with MongoDB integration.</p>
        <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 20px 30px; border-radius: 12px; margin-top: 20px; text-align: left;">
          <p><strong>MongoDB Integrated Endpoints:</strong></p>
          <ul style="color: #E4B564;">
            <li><code>GET /api/health</code> - Health Check</li>
            <li><code>GET/POST /api/blogs</code> - Blog Posts (MongoDB Collection: blogs)</li>
            <li><code>POST /api/contact</code> - Contact Form Submissions (MongoDB Collection: contacts)</li>
            <li><code>POST /api/bookings/safari</code> - Desert Safari Bookings (MongoDB Collection: bookings)</li>
            <li><code>POST /api/bookings/city-tour</code> - City Tour Bookings (MongoDB Collection: bookings)</li>
            <li><code>POST /api/bookings/general</code> - Book Now Modal Bookings (MongoDB Collection: bookings)</li>
            <li><code>GET /api/stats</code> - Dashboard Overview Stats</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled API Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error occurred",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Desert Journey DXB MongoDB Server running on port ${PORT}`);
  console.log(`🍃 Database: MongoDB (${process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/desert_journey_dxb"})`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`📝 Blog API: http://localhost:${PORT}/api/blogs`);
  console.log(`📬 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`🎟️ Bookings API: http://localhost:${PORT}/api/bookings`);
  console.log(`====================================================`);
});

export default app;
