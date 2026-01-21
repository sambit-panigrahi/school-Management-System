// models/Staff.js
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  designation: { type: String, enum: ["Teacher","Administrator","Support Staff"], default: "Teacher" },
  qualification: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
