const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  admNo: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Admission", admissionSchema);
