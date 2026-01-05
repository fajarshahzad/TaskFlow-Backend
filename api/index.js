const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running on Vercel 🚀");
});

// ❌ NO app.listen()

module.exports = app;
