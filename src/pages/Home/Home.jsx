import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import "./Home.css";

const Home = () => {
  const [formData, setFormData] = useState({
    admNo: "",
    studentName: "",
    className: "BCA",
    dateOfBirth: "",
    gender: "Male",
    contact: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  // Correct API URL for admission route
  const API_URL = "http://localhost:5000/api/admission/add";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      // Check if server returned OK
      if (!res.ok) {
        const errorText = await res.text(); // get raw response if not JSON
        throw new Error(errorText);
      }

      const data = await res.json();

      alert("Admission saved successfully!");

      // Reset form
      setFormData({
        admNo: "",
        studentName: "",
        className: "BCA",
        dateOfBirth: "",
        gender: "Male",
        contact: "",
        address: ""
      });
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>New Admission</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="admNo"
            placeholder="Admission No (e.g., 101)"
            value={formData.admNo}
            onChange={handleChange}
            required
          />

          <input
            name="studentName"
            placeholder="Student Name (e.g., John Doe)"
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

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="contact"
            placeholder="Contact Number (10 digits)"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address (e.g., 123 Street, City)"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
