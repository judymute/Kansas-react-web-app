import { useState, useEffect } from "react";
import axios from "axios";
import { courses } from "../../Kanbas/Database";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import "./index.css"


const API_BASE = process.env.REACT_APP_API_BASE;
function Courses() {
  const { courseId } = useParams();

  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    try {
      const response = await axios.get(`${COURSES_API}/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // Handle the 404 case here (e.g., set a default course or show an error message)
        console.error(`Course with ID ${courseId} not found.`);
      } else {
        console.error("Failed to fetch course:", error);
      }
    }
  };
  
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);


  const url = window.location.href;
  const term = url.split("/");
  const courseName = term[term.length - 2];
  const currentLocation = term[term.length - 1];
  return (
    <div>
      <div className="course-name-container">
        <h3 className="course-name"><GrMenu className="breadcrumb-icon"/> {course.number}.{courseName} <MdOutlineKeyboardArrowRight className="angle-icon"/> 
        <span className="current-nav-location">{currentLocation}</span> </h3>
      </div>

      
      <div className="d-flex">
        <CourseNavigation />
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