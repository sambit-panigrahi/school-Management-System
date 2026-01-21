import { useState } from "react";
import Sidebar from "../../Components/Slidebar";
import axios from "axios";
import "./ViewResult.css";

const ViewResult = () => {
  const [admNo, setAdmNo] = useState("");
  const [resultData, setResultData] = useState(null);

  const loadResult = async () => {
    if (!admNo) return alert("Enter Admission No");

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/viewresult/${admNo}`
      );
      setResultData(data);
    } catch (error) {
      alert(error.response?.data?.error || "Error fetching result");
      setResultData(null);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h2>VIEW RESULT</h2>

        <div className="search-container">
          <input
            placeholder="Enter Admission No"
            value={admNo}
            onChange={(e) => setAdmNo(e.target.value)}
          />
          <button onClick={loadResult}>Get Result</button>
        </div>

        <table className="result-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
              <th>Total Marks</th>
              <th>Term</th>
            </tr>
          </thead>
          <tbody>
            {resultData?.subjects?.length > 0 ? (
              resultData.subjects.map((s, index) => (
                <tr key={index}>
                  <td>{s.subject}</td>
                  <td>{s.marksObtained}</td>
                  <td>{s.total}</td>
                  <td>{resultData.term}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
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

export default ViewResult;
