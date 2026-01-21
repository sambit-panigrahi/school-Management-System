const express = require("express");
const router = express.Router();
const { getStudents } = require("../controllers/studentController");

router.get("/", getStudents); // GET /api/student?className=BCA

module.exports = router;
