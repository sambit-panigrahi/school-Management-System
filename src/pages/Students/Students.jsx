import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import "./Students.css";

const Students = () => {
  const [branch, setBranch] = useState(""); // selected branch
  const [students, setStudents] = useState([]); // fetched students
  const [loading, setLoading] = useState(false);

  const handleBranchChange = (e) => setBranch(e.target.value);

  const handleViewStudents = async () => {
    if (!branch) {
      alert("Please select a branch to filter");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/student?className=${branch}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setStudents(data.students || []);
    } catch (error) {
      alert("Error fetching students: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>VIEW STUDENTS</h2>

        <select value={branch} onChange={handleBranchChange}>
          <option value="">Filter by Branch</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
          <option value="PGDM">PGDM</option>
          <option value="NURSHING">NURSHING</option>
        </select>

        <button
          style={{ backgroundColor: "#4fb6e8", color: "white", marginLeft: "10px", padding: "6px 12px", border: "none", borderRadius: "6px", cursor: "pointer" }}
          onClick={handleViewStudents}
          disabled={loading}
        >
          {loading ? "Loading..." : "View Students"}
        </button>

        <table>
          <thead>
            <tr>
              <th>ADM NO</th>
              <th>NAME</th>
              <th>CLASS</th>
              <th>GENDER</th>
              <th>CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No students found</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s._id}>
                  <td>{s.admNo}</td>
                  <td>{s.studentName}</td>
                  <td>{s.className}</td>
                  <td>{s.gender}</td>
                  <td>{s.contact}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
