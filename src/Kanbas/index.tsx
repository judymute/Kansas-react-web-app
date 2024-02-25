import { Routes, Route, Navigate, Link } from "react-router-dom";
import Nav from "../Nav";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
// import "./index.css";
function Kanbas() {
  return (
    <div className="d-flex" >
      <div style={{ minHeight: '100vh', display : "flex"}}>
        <KanbasNavigation />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses/:courseId/*" element={<Courses/>} />
        </Routes>
        {/* <h1>Account</h1>
        <h1>Courses</h1> */}
      </div>
    </div>
  );
}
export default Kanbas;