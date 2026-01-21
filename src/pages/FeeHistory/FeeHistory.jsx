import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import axios from "axios";
import "./FeeHistory.css";

const FeeHistory = () => {
  const [admNo, setAdmNo] = useState("");
  const [fees, setFees] = useState([]);

  const loadHistory = async () => {
    if (!admNo) return alert("Enter Admission No");

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/fees/history/${admNo}`
      );
      setFees(data);
    } catch (error) {
      alert(error.response?.data?.error || "Error fetching fee history");
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>FEE PAYMENT HISTORY</h2>

        {/* Admission No + Load History button */}
        <div className="search-container">
          <input
            placeholder="Enter Admission No"
            value={admNo}
            onChange={(e) => setAdmNo(e.target.value)}
          />
          <button onClick={loadHistory}>Load History</button>
        </div>

        {/* Fee history table */}
        <table className="fee-history-table">
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Name</th>
              <th>Class</th>
              <th>Month</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {fees.length > 0 ? (
              fees.map((f) => (
                <tr key={f._id}>
                  <td>{f.admNo}</td>
                  <td>{f.studentName}</td>
                  <td>{f.className}</td>
                  <td>{f.month}</td>
                  <td>{f.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeHistory;
