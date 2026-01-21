import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import "./Staff.css";

const Staff = () => {
  const [formData, setFormData] = useState({
    staffId: "",
    fullName: "",
    designation: "Teacher",
    qualification: "",
    contactNo: "",
    email: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/staff/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Staff saved successfully");

      setFormData({
        staffId: "",
        fullName: "",
        designation: "Teacher",
        qualification: "",
        contactNo: "",
        email: "",
        address: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>STAFF MANAGEMENT</h2>

        <form className="grid" onSubmit={handleSubmit}>
          <input name="staffId" placeholder="Staff ID" value={formData.staffId} onChange={handleChange} required />
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />

          <select name="designation" value={formData.designation} onChange={handleChange}>
            <option>Teacher</option>
            <option>Administrator</option>
            <option>Support Staff</option>
          </select>

          <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required />
          <input name="contactNo" placeholder="Contact Number" value={formData.contactNo} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />

          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Staff;
