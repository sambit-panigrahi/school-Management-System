const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admission", require("./routes/admissionRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/fees", require("./routes/feesRoutes")); 
app.use("/api/fees", require("./routes/feeHistoryRoutes")); // <- note we mounted here to match frontend
app.use("/api/result", require("./routes/resultRoutes"));
app.use("/api/viewresult", require("./routes/viewResultRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
