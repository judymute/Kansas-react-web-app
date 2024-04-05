import { Routes, Route, Navigate, Link } from "react-router-dom";
import Nav from "../Nav";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import store from "./store"
import { Provider } from "react-redux";
import axios from "axios";
// import "./index.css";


const API_BASE = process.env.REACT_APP_API_BASE;
function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]); // create courses state variable and initialize with database's courses
  // const COURSES_API = "https://kanbas-node-server-app-wpbi.onrender.com/api/courses";
  const COURSES_API = `${API_BASE}/api/courses`;
  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([ ...courses, response.data ]);
    setPublishedCoursesCount(courses.length + 1);
  };


  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter(
      (c) => c._id !== courseId));
    setPublishedCoursesCount(courses.length - 1);
  };


  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  useEffect(() => {
    setPublishedCoursesCount(courses.length);
  }, [courses]);


  const [publishedCoursesCount, setPublishedCoursesCount] = useState(courses.length);
  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "course-image-9.jpeg"
  });


  // create addNewCourse event handler that sets courses as copy of current courses state array
  // add course at the end of the array overriding _id to current item stamp
  // const addNewCourse = () => {
  //   setCourses([...courses, { ...course, _id: new Date().getTime().toString(), image: course.image }]);
  //   setPublishedCoursesCount(prevCount => prevCount + 1);
  // };


  // const deleteCourse = (courseId: any) => {
  //   setCourses(courses.filter((course) => course._id !== courseId));
  //   setPublishedCoursesCount(prevCount => prevCount - 1); // Decrease count by one
  // };

  // const updateCourse = () => {
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  // };


  return (
    <Provider store={store}>
      <div className="d-flex" >
        <div style={{ minHeight: '100vh', display: "flex" }}>
          <KanbasNavigation />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<h1>Account</h1>} />
            <Route path="Dashboard" element={
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                publishedCoursesCount={publishedCoursesCount} />
            } />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
          {/* <h1>Account</h1>
        <h1>Courses</h1> */}
        </div>
      </div>


    </Provider>

  );
}
export default Kanbas;