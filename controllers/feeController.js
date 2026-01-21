const Fee = require("../models/Fee");

// Add Fee
exports.addFee = async (req, res) => {
  try {
    const { admNo, studentName, className, month, amount, datePaid } = req.body;

    if (!admNo || !studentName || !className || !month || !amount || !datePaid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFee = new Fee({
      admNo,
      studentName,
      className,
      month,
      amount,
      datePaid,
    });

    const savedFee = await newFee.save();

    res.status(201).json({ message: "Fee saved successfully", fee: savedFee });
  } catch (err) {
    console.error("Fee Save Error:", err);
    res.status(500).json({ error: "Failed to save fee" });
  }
};
