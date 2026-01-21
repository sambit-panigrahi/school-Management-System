// routes/resultRoutes.js
const express = require("express");
const router = express.Router();
const { addResult, getResultByAdmissionNo } = require("../controllers/resultController");

// POST: Add new result
router.post("/add", addResult);

// GET: Fetch results by admission number
router.get("/:admissionNo", getResultByAdmissionNo);

module.exports = router;

