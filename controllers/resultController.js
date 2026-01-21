// controllers/resultController.js
const Result = require("../models/Result");

// Add a new result
exports.addResult = async (req, res) => {
  try {
    const { admissionNo, studentName, className, term, subjects } = req.body;

    if (!admissionNo || !studentName || !className || !term || !subjects)
      return res.status(400).json({ error: "All fields are required" });

    const newResult = new Result({
      admissionNo,
      studentName,
      className,
      term,
      subjects,
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get results by admission number (optional)
exports.getResultByAdmissionNo = async (req, res) => {
  try {
    const { admissionNo } = req.params;
    const results = await Result.find({ admissionNo });
    if (!results.length) return res.status(404).json({ error: "No results found" });
    res.json(results);
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({ error: "Server error" });
  }
};
