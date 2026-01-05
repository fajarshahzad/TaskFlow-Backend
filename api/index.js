const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import controller
const { registerUser, loginUser } = require("../controllers/authController");

const app = express();

app.use(cors({
  origin: "https://task-flow-frontend-six.vercel.app/",
  credentials: true
}));
app.use(express.json());

// Routes
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

// Database connection helper (Vercel friendly)
let isConnected = false; // global cache

async function connectDB() {
  if (isConnected) return; // already connected
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected ✅");
}

// Wrap each request with DB connect
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

module.exports = app; // IMPORTANT for serverless
