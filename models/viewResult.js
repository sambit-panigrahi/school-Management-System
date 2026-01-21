const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  admissionNo: { type: String, required: true },
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  term: { type: String, required: true },
  subjects: [
    {
      subject: { type: String, required: true },
      marksObtained: { type: Number, required: true },
      total: { type: Number, required: true, default: 100 },
    },
  ],
});

module.exports = mongoose.models.Result || mongoose.model("Result", resultSchema);
