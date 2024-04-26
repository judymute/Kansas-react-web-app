import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import "./index.css";
import QuizEditPage from "./QuizEditPage";
import QuizEdit from "./QuizEdit";
import { Quiz } from "./type";
import axios from "axios";
import * as client from "./client";
import { v4 as uuidv4 } from 'uuid';

function Quizzes() {

  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [quiz, setQuiz] = useState<client.Quiz>();
  const [quizzes, setQuizzes] = useState<client.Quiz[]>([]); // quizzes will be used when we want to redner a list of all quizzes

  // search stuff
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // need to fetch all quizzes
    const fetchQuizzes = async () => {
      try {
        const fetchedQuizzes = await client.findAllQuizzes();
        console.log('Fetched questions:', fetchedQuizzes);
        setQuizzes(fetchedQuizzes);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    console.log('Fetching quizzes...');
    fetchQuizzes(); // uses the id of the current quiz
  }, []); 

  const addNewQuiz = async () => {
    // Creating a new quiz template with unique IDs
    const newQuizTemplate = {
      _id: uuidv4(),
      name: "Yay New Quiz",
      points: "10",
      assignmentGroup: "Quizzes",
      courseId: courseId,
      questions: [],
    };

    try {
      const newQuiz = await client.createQuiz(newQuizTemplate);
      //await client.createQuiz(quiz);
      setQuiz(newQuiz);
      setQuizzes(prevQuiz=> [...prevQuiz, newQuiz]);
      console.log('Created new quiz:', newQuiz);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuizTemplate._id}/edit`);
    } catch (err) {
      console.error('Error creating quiz:', err);
    }
  }

  return (
    <div className="quizzes-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for Quiz"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="quiz-button" onClick={addNewQuiz}>
          + Quiz
        </button>
      </div>
      <div className="course-quizzes">
        <h3>Course Quizzes</h3>
        {quizzes?.map(quiz => (
          <div key={quiz._id}>
            {quiz.name}
          </div>
        ))}
      </div>
      <Routes>
        <Route
          path="/:quizId/edit/*" element={<QuizEdit quizData={quiz!}/>}/>
      </Routes>
    </div>
  );
}

export default Quizzes;