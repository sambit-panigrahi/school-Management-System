import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import "./Fees.css";

const Fees = () => {
  const [formData, setFormData] = useState({
    admNo: "",
    studentName: "",
    className: "BCA",
    month: "January",
    amount: "",
    datePaid: ""
  });

  const API_URL = "http://localhost:5000/api/fees/add";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fee save failed");
      }

      alert("Fee submitted successfully");

      setFormData({
        admNo: "",
        studentName: "",
        className: "BCA",
        month: "January",
        amount: "",
        datePaid: ""
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>Fee Submission</h2>

        <form onSubmit={handleSubmit} className="grid">
          <input
            name="admNo"
            placeholder="Admission No"
            value={formData.admNo}
            onChange={handleChange}
            required
          />

          <input
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            required
          />

          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
          >
            <option>BCA</option>
            <option>BBA</option>
            <option>MCA</option>
            <option>MBA</option>
          </select>

          <select name="month" value={formData.month} onChange={handleChange}>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <input
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="datePaid"
            value={formData.datePaid}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Fee</button>
        </form>
      </div>
    </div>
  );
};

export default Fees;
