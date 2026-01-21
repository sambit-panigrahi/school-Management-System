const Result = require("../models/ViewResult");

exports.getResultByAdmissionNo = async (req, res) => {
  try {
    const { admissionNo } = req.params;

    if (!admissionNo)
      return res.status(400).json({ error: "Admission number is required" });

    const result = await Result.findOne({ admissionNo });

    if (!result)
      return res.status(404).json({ error: "No result found for this student" });

    res.status(200).json(result);
  } catch (err) {
    console.error("View Result Error:", err);
    res.status(500).json({ error: "Failed to fetch result" });
  }
};
