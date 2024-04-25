import React, { useState, useCallback } from 'react';
import { useParams, Link, Routes, Route, Navigate } from 'react-router-dom';
import './QuizEdit.css';
import Questions from './Questions';
import QuizDetails from './QuizDetails';

interface QuizEditProps {
  quizName?: string;
  setQuizName?: (name: string) => void;
}

export function QuizEdit({ quizName = 'Unnamed Quiz', setQuizName = () => { } }: QuizEditProps = {}
) {


  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  console.log("QuizEdit component: quizId =", quizId);

  const [localQuizName, setLocalQuizName] = useState(quizName);
  console.log("QuizEdit component: Initial quizName =", quizName);

  const handleQuizNameChange = (name: string) => {
    setLocalQuizName(name);
    setQuizName?.(name);
    console.log("QuizEdit component: Quiz name changed to", name);
  };

  const handleLinkClick = useCallback((tabName: string) => {
    console.log(`Attempting to navigate to ${tabName}`);
  }, []);

  return (
    <div className="quiz-edit-container">
      <div className="quiz-details">
        <div className="quiz-info">
          <div>Points: 0</div>
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
          value={localQuizName}
          onChange={(e) => handleQuizNameChange(e.target.value)}
        />
      </div>
      <Routes>
        <Route path="/" element={<Navigate replace to="details" />} />
        <Route path="details" element={<QuizDetails />} />
        <Route path="questions/*" element={<Questions />} />
      </Routes>
    </div>
  );
}
