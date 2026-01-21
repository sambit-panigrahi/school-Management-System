import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx"; 
import Students from "./pages/Students/Students.jsx";
import Fees from "./pages/Fees/Fees.jsx";
import FeeHistory from "./pages/FeeHistory/FeeHistory.jsx";
import EnterResult from "./pages/EnterResult/EnterResult.jsx";
import ViewResult from "./pages/ViewResult/ViewResult.jsx";
import Staff from "./pages/Staff/Staff.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/fee-history" element={<FeeHistory />} />
        <Route path="/enter-result" element={<EnterResult />} />
        <Route path="/view-result" element={<ViewResult />} />
        <Route path="/Staff" element={<Staff />} />
      </Routes>
    </Router>
  );
}

export default App;
