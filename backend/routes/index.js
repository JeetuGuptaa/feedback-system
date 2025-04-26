const express = require("express");
const router = express.Router();
const feedbackRoutes = require("./feedback");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
    message: "Welcome to the backend API",
  });
});

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
    message: "Backend is healthy",
  });
});

router.use("/feedback", feedbackRoutes);

module.exports = router;
