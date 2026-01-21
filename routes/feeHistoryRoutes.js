const express = require("express");
const router = express.Router();
const { getFeeHistory } = require("../controllers/feeHistoryController");

// GET /api/fees/history/:admNo
router.get("/history/:admNo", getFeeHistory);

module.exports = router;

