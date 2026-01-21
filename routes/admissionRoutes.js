const express = require("express");
const router = express.Router();
const { addAdmission } = require("../controllers/admissionController");

// POST /api/admission/add
router.post("/add", addAdmission);

module.exports = router;

