import React, { useState, useCallback, useEffect } from 'react';
import { useParams, Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import './QuizEdit.css';
import Questions from './Questions';
import QuizDetails from './QuizDetails';
import { Quiz } from './type';
import * as client from "./client";

interface AddedQuizProps {
  quizData: client.Quiz;
}

const QuizEdit: React.FC<AddedQuizProps> = ({ quizData }) =>  {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  console.log("QuizEdit component: quizId =", quizId);
  
  
  const [quiz, setQuiz] = useState<client.Quiz>(quizData);

  const save = async () => {
    console.log('updating quiz:', quiz);
    await client.updateQuiz(quiz);
  };

  const navigate = useNavigate();
  
  const handleLinkClick = useCallback((tabName: string) => {
    console.log(`Attempting to navigate to ${tabName}`);
  }, []);
  
  return (
    <div className="quiz-edit-container">
      <div className="quiz-details">
        <div className="quiz-info">
          <div>Points: </div>
          <div>Not Published</div>
        </div>
      </div>
      <div className="quiz-tabs">
        <Link to="details" className='tab' onClick={() => handleLinkClick('Details')}>Details</Link>
        <Link to="questions" className='tab' onClick={() => handleLinkClick('Questions')}>Questions</Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Unnamed Quiz"
          value={quiz?.name}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
        />
      </div>

      <div className="quiz-details">
        <button
          className="save-button"
          onClick={save}
        >
          Save
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Navigate replace to="details" />} />
        <Route path="details" element={<QuizDetails />} />
        <Route path="questions/*" element={<Questions quizData={quiz!}/>} /> //we will want to pass a quiz
        
      </Routes>
    </div>
  );
}

export default QuizEdit;

