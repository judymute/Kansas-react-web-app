import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useParams, Link } from "react-router-dom";
import "./index.css";
import QuizEditPage from "./QuizEditPage";
import QuizEdit from "./QuizEdit";
import { Quiz } from "./type";
import axios from "axios";
import * as client from "./client";
import { v4 as uuidv4 } from 'uuid';
import QuizInfo from "./QuizInfo";

function Quizzes() {

  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [quiz, setQuiz] = useState<client.Quiz>();
  const [quizzes, setQuizzes] = useState<client.Quiz[]>([]); // quizzes will be used when we want to render a list of all quizzes

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
      setQuizzes(prevQuiz => [...prevQuiz, newQuiz]);
      console.log('Created new quiz:', newQuiz);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuizTemplate._id}/edit`);
    } catch (err) {
      console.error('Error creating quiz:', err);
    }
  };

  const groupQuizzesByAssignmentGroup = (quizzes: client.Quiz[]) => {
    return quizzes.reduce((groups, quiz) => {
      const assignmentGroup = quiz.assignmentGroup;
      if (!groups[assignmentGroup]) {
        groups[assignmentGroup] = [];
      }
      groups[assignmentGroup].push(quiz);
      return groups;
    }, {} as Record<string, client.Quiz[]>);
  };

  
  const quizzesByAssignmentGroup = groupQuizzesByAssignmentGroup(quizzes);

  return (
    <div className="quizzes-container">
      <div className="search-container">
        <input type="text" placeholder="Search for Quiz" value={searchTerm} onChange={handleSearch} />
      </div>
      <button className="add-quiz-button" onClick={addNewQuiz}>+ Quiz</button>
      <div className="quizzes-list">

        {Object.entries(quizzesByAssignmentGroup).map(([assignmentGroup, quizzes]) => (
          <div key={assignmentGroup} className="assignment-group">
            <h3 className="assignment-group-header">{assignmentGroup}</h3>
            {quizzes?.map(quiz => (
              <div key={quiz._id} className="quiz-item">
                <div className="quiz-info">
                  <span className="quiz-name"> <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>{quiz.name}</Link></span>
                  <span className="quiz-status">
                    {new Date() > new Date(quiz.untilDate) ? 'Closed' :
                      new Date() >= new Date(quiz.availableFrom) && new Date() <= new Date(quiz.untilDate) ? 'Available' :
                        `Not available until ${new Date(quiz.availableFrom).toLocaleString()}`}
                  </span>
                </div>
                <div className="quizzes-details">
                  <span className="quiz-due-date">Due {new Date(quiz.dueDate).toLocaleString()}</span>
                  <span className="quiz-points">{quiz.points} pts</span>
                  <span className="quiz-questions">{quiz.questions.length} Questions</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Routes>
        <Route path="/:quizId" element={<QuizInfo quizData={null} />} />
        <Route path="/:quizId/edit/*" element={<QuizEdit quizData={quiz!} />} />
      </Routes>
    </div>
  );
}

export default Quizzes;