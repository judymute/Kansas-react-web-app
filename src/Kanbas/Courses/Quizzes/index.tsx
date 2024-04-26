import React, { useState } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import "./index.css";
import QuizEditPage from "./QuizEditPage";
import { Quiz } from "./type";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

interface QuizzesProps {
  quizzes: Quiz[];
  addQuiz: (quiz: Quiz) => void;
}

function Quizzes({ quizzes, addQuiz }: QuizzesProps) {
  console.log("Received quizzes in Quizzes component:", quizzes);

  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  if (!courseId) {
    // Handle the case when courseId is not available
    return <div>Course ID not found.</div>;
  }


  const [searchTerm, setSearchTerm] = useState("");
  const handleAddQuiz = async () => {
    const quizId = generateQuizId();
    const newQuiz: Quiz = {
      id: quizId,
      name: 'Unnamed Quiz',
      assignmentGroup: 'Quizzes',
      courseId: courseId,
    };

    try {
      await addQuiz(newQuiz);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      // Handle the error, show an error message, or take appropriate action
    }
  };



  const generateQuizId = () => {
    return uuidv4();
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