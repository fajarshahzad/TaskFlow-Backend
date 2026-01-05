const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// controllers import
const { registerUser, loginUser } = require("../controllers/authController");

const app = express();

// middleware
app.use(cors({
  origin: "https://task-flow-frontend-six.vercel.app/", // frontend URL
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes (serverless friendly)
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);

module.exports = app;  // Important: serverless export
