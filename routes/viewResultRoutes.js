const express = require("express");
const router = express.Router();
const { getResultByAdmissionNo } = require("../controllers/viewResultController");

// GET /api/viewresult/:admissionNo
router.get("/:admissionNo", getResultByAdmissionNo);

module.exports = router;

