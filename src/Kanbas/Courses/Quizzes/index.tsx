import React, { useState } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import "./index.css";
import QuizEditPage from "./QuizEditPage";
import { Quiz } from "./type";
import axios from "axios";

interface QuizzesProps {
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
}

function Quizzes({ quizzes, addQuiz }: QuizzesProps) {
  console.log("Received quizzes in Quizzes component:", quizzes);

  const saveQuizzesToDatabase = async (quizzes: any) => {
    try {
      const response = await axios.post("/quizzes/save", quizzes);
      console.log("Quizzes saved to the database:", response.data);
    } catch (error) {
      console.error("Error saving quizzes to the database:", error);
    }
  };

  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddQuiz = () => {
    const quizId = generateQuizId();
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  };

  const generateQuizId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const groupQuizzesByAssignmentGroup = () => {
    const groupedQuizzes: { [key: string]: Quiz[] } = {};
    quizzes.forEach((quiz) => {
      if (!groupedQuizzes[quiz.assignmentGroup]) {
        groupedQuizzes[quiz.assignmentGroup] = [];
      }
      groupedQuizzes[quiz.assignmentGroup].push(quiz);
    });
    return groupedQuizzes;
  };

  const renderGroupedQuizzes = () => {
    const groupedQuizzes = groupQuizzesByAssignmentGroup();
    return Object.entries(groupedQuizzes).map(([assignmentGroup, quizzes]) => (
      <div key={assignmentGroup}>
        <h3>{assignmentGroup}</h3>
        {quizzes.map((quiz) => (
          <div key={quiz.id}>{quiz.name}</div>
        ))}
      </div>
    ));
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterQuizzes = (quizzes: Quiz[]) => {
    return quizzes.filter((quiz) =>
      quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredQuizzes = filterQuizzes(quizzes);

  return (
    <div className="quizzes-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for Quiz"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="quiz-button" onClick={handleAddQuiz}>
          + Quiz
        </button>
      </div>
      <div className="course-quizzes">
        <h3>Course Quizzes</h3>
        {renderGroupedQuizzes()}
      </div>
      <Routes>
        <Route
          path="/:quizId/edit"
          element={<QuizEditPage addQuiz={addQuiz} />}
        />
      </Routes>
    </div>
  );
}

export default Quizzes;