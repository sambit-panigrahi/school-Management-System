import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Slidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const username = localStorage.getItem("userName") || "Admin";
  const role = localStorage.getItem("userRole") || "admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <div className="mobile-title">OXFORD SCHOOL</div>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="profile">
          <img src="/adminlogo.png" alt="Admin" className="admin-logo" />
          <h3>{username}</h3>
          <p>OXFORD SCHOOL</p>
        </div>

        <nav onClick={() => setOpen(false)}>
          {role === "admin" && (
            <>
              <Link to="/home">Admission</Link>
              <Link to="/students">Students</Link>
              <Link to="/fees">Fees</Link>
              <Link to="/fee-history">Fee History</Link>
              <Link to="/enter-result">Enter Result</Link>
              <Link to="/view-result">View Result</Link>
              <Link to="/staff">Staff</Link>
            </>
          )}

          {role === "teacher" && (
            <>
              <Link to="/students">Students</Link>
              <Link to="/enter-result">Enter Result</Link>
              <Link to="/view-result">View Result</Link>
            </>
          )}

          {role === "student" && (
            <>
              <Link to="/view-result">View Result</Link>
              <Link to="/fees">Fees</Link>
            </>
          )}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
