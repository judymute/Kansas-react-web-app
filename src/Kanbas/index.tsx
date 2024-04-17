import { Routes, Route, Navigate, Link } from "react-router-dom";
import Nav from "../Nav";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import store from "./store"
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./Account";

// Get the API base URL from the environment variable
const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
  // State variable to hold courses data
  const [courses, setCourses] = useState<any[]>([]);

  // API endpoint for courses
  const COURSES_API = `${API_BASE}/api/courses`;
  const [selectedColor, setSelectedColor] = useState("#008400");

  // Function to update an existing course
  const updateCourse = async (selectedColor: string) => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      { ...course, color: selectedColor },
      { withCredentials: true }
    );
    // Update the courses state with the updated course
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return { ...course, color: selectedColor };
        }
        return c;
      })
    );
  };
  // Function to add a new course
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course, { withCredentials: true });
    // Add the new course to the courses state
    setCourses([...courses, response.data]);
    // Update the published courses count
    setPublishedCoursesCount(courses.length + 1);
  };

  // Function to delete a course
  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(`${COURSES_API}/${courseId}`, { withCredentials: true });
    // Remove the deleted course from the courses state
    setCourses(courses.filter( (c) => c._id !== courseId));
    // Update the published courses count
    setPublishedCoursesCount(courses.length - 1);
  };

  // Function to fetch all courses from the API
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API, { withCredentials: true });
    // Set the courses state with the fetched data
    setCourses(response.data);
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    findAllCourses();
  }, []);

  // Update the published courses count whenever courses state changes
  useEffect(() => {
    setPublishedCoursesCount(courses.length);
  }, [courses]);

  // State variable to hold the count of published courses
  const [publishedCoursesCount, setPublishedCoursesCount] = useState(courses.length);

  // State variable to hold the current course data
  const [course, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "course-image-9.jpeg"
  });

  return (
    <Provider store={store}>
      <div className="d-flex" >
        <div style={{ minHeight: '100vh', display: "flex" }}>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account/>} />
            <Route path="Dashboard" element={
  <Dashboard
    courses={courses}
    course={course}
    setCourse={setCourse}
    addNewCourse={addNewCourse}
    deleteCourse={deleteCourse}
    updateCourse={(selectedColor: string) => updateCourse(selectedColor)}
    publishedCoursesCount={publishedCoursesCount}
    selectedColor={selectedColor}
    setSelectedColor={setSelectedColor}
  />
} />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Kanbas;