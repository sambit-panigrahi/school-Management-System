const express = require("express");
const router = express.Router();
const { addFee } = require("../controllers/feeController");

router.post("/add", addFee); // POST /api/fees/add

module.exports = router;
