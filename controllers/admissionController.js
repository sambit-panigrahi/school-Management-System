const Admission = require("../models/Admission");

// Add new admission
exports.addAdmission = async (req, res) => {
  try {
    const { admNo, studentName, className, dateOfBirth, gender, contact, address } =
      req.body;

    const newAdmission = new Admission({
      admNo,
      studentName,
      className,
      dateOfBirth,
      gender,
      contact,
      address,
    });

    await newAdmission.save();

    res.status(200).json({ message: "Admission added successfully", newAdmission });
  } catch (error) {
    console.error("Add Admission Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Admission number already exists" });
    }

    res.status(500).json({ error: "Failed to add admission" });
  }
};
