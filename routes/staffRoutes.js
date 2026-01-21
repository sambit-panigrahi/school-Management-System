const express = require("express");
const router = express.Router();
const { addStaff } = require("../controllers/staffController");

router.post("/add", addStaff);

module.exports = router;

