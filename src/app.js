const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WA-2 Task Management API is running",
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error.message);
  });

module.exports = app;