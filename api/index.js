const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("../routes/authRoutes");
const projectRoutes = require("../routes/projectRoutes");
const taskRoutes = require("../routes/taskRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "https://task-flow-frontend-six.vercel.app/", // Replace with your frontend URL
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection (Vercel friendly)
let isConnected = false; // To prevent multiple connections on cold start

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log("MongoDB connected ✅");
}

// Wrap each request with DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Remove app.listen() completely — Vercel handles server
module.exports = app;  // VERY IMPORTANT for Vercel serverless
