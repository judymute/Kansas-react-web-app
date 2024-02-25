import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import "./index.css"

function Courses() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const url = window.location.href;
  const term = url.split("/");
  const courseName = term[term.length - 2];
  return (
    <div>
      <div className="course-name-container">
        <h3 className="course-name"><HiMiniBars3 /> {courseName}</h3>
      </div>

      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll"
          style={{ left: "320px", top: "50px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div >
    </div >
  );
}
export default Courses;