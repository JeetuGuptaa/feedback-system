const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend API",
  });
});

router.get("/health", (req, res) => {
  res.status(200).json({
    message: "Backend is healthy",
  });
});

module.exports = router;
