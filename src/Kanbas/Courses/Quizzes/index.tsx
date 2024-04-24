import React from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import "./index.css";
import { QuizEdit } from "./QuizEdit";

function Quizzes() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  console.log("Quizzes component: courseId =", courseId);

  const handleAddQuiz = () => {
    const quizId = generateQuizId();
    console.log("Quizzes component: Navigating to", `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  };

  
  const generateQuizId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="quizzes-container">
      <div className="search-container">
        <input type="text" placeholder="Search for Quiz" />
        <button className="quiz-button" onClick={handleAddQuiz}>
          + Quiz
        </button>
      </div>
      <div className="course-quizzes">
        <h3>Course Quizzes</h3>
      </div>
    </div>
  );
}
export default Quizzes;