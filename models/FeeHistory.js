const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  admNo: { type: String, required: true },
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  datePaid: { type: Date, required: true },
});

module.exports = mongoose.models.Fee || mongoose.model("Fee", feeSchema);
