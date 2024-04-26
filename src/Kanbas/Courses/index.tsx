import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import CourseNavigation from './Navigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import './index.css';
import breadcrumbArrowLight from './breadcrumb-arrow-light.svg';
import Quizzes from './Quizzes';
import QuizEditPage from './Quizzes/QuizEditPage';
import { Quiz } from './Quizzes/type';

axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {

  const { courseId } = useParams();
  console.log("Courses component: courseId =", courseId);
  
  if (!courseId) {
    // Handle the case when courseId is not available
    return <div>Course ID not found.</div>;
  }
  const request = axios.create({ withCredentials: true });
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: '' });
  const [quizName, setQuizName] = useState('Unnamed Quiz');

  const findCourseById = async (courseId?: string) => {
    try {
      const response = await request.get(`${COURSES_API}/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Course with ID ${courseId} not found.`);
      } else {
        console.error('Failed to fetch course:', error);
      }
    }
  };

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const addQuiz = async (quiz: Quiz) => {
    try {
      const response = await axios.post(`${API_BASE}/quizzes`, { ...quiz, _id: quiz.id, courseId });
      if (response.status === 200) {
        // Fetch the updated list of quizzes from the server
        fetchQuizzes();
      }
    } catch (error) {
      console.error('Error when adding quiz', error);
    }
  };


  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`${API_BASE}/quizzes?courseId=${courseId}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error loading quizzes from server', error);
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${API_BASE}/quizzes?courseId=${courseId}`);
        console.log('Fetched quizzes:', response.data);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error loading quizzes from server', error);
      }
    };
  
    fetchQuizzes();
  }, [courseId]);

  
  const url = window.location.href;
  const term = url.split('/');
  const courseName = term[term.length - 2];
  const currentLocation = term[term.length - 1];

  interface Quiz {
    id: string;
    name: string;
    assignmentGroup: string;
  }


  return (
    <div className="course-container">
      <div className="course-name-container">
        <h3 className="course-name">
          <GrMenu className="breadcrumb-icon" />
          {course.number}.{courseName}
          <img src={breadcrumbArrowLight} alt="Arrow" className="angle-icon" />
          {currentLocation === 'edit' ? (
            <>
              <MdOutlineKeyboardArrowRight className="angle-icon" />
              Quizzes
              <MdOutlineKeyboardArrowRight className="angle-icon" />
              {quizName}
            </>
          ) : (
            <span className="current-nav-location">{currentLocation}</span>
          )}
        </h3>
      </div>
      <div className="d-flex">
        <CourseNavigation />
        <div className="overflow-y-scroll" style={{ left: '320px', top: '50px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Quizzes/*" element={<Quizzes quizzes={quizzes} addQuiz={addQuiz} courseId={courseId} />} />
            <Route path="Quizzes/:quizId/edit/*" element={<QuizEditPage quizName={quizName} setQuizName={setQuizName} addQuiz={addQuiz} />} />
            {/* <Route path="Quizzes/:quizId/edit/questions/*" element={<Questions />} /> */}
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;