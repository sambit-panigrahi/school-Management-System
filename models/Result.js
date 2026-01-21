// models/Result.js
const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  total: { type: Number, required: true, default: 100 },
  marksObtained: { type: Number, required: true },
});

const ResultSchema = new mongoose.Schema({
  admissionNo: { type: String, required: true },
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  term: { type: String, required: true },
  subjects: { type: [SubjectSchema], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Result", ResultSchema);
