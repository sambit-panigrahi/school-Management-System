const Fee = require("../models/Fee");

exports.getFeeHistory = async (req, res) => {
  try {
    const { admNo } = req.params;

    if (!admNo)
      return res.status(400).json({ error: "Admission number is required" });

    const fees = await Fee.find({ admNo }).sort({ datePaid: -1 });

    if (!fees.length)
      return res.status(404).json({ error: "No fee records found" });

    res.status(200).json(fees);
  } catch (err) {
    console.error("Fee History Error:", err);
    res.status(500).json({ error: "Failed to fetch fee history" });
  }
};
