const Staff = require("../models/Staff");

exports.addStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json({ message: "Staff saved" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
