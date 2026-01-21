const Admission = require("../models/Admission"); // use Admission model

// GET /api/student?className=BCA
exports.getStudents = async (req, res) => {
  try {
    const { className } = req.query;

    if (!className) return res.status(400).json({ error: "className query parameter is required" });

    // Fetch students from the Admission collection
    const students = await Admission.find({ className }).sort({ studentName: 1 });

    res.status(200).json({ students });
  } catch (error) {
    console.error("Get Students Error:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};
