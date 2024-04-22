// src/Kanbas/Courses/Quizzes/QuizEditPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { QuizEdit } from './QuizEdit';

interface QuizEditPageProps {
  quizName: string;
  setQuizName: (name: string) => void;
}

function QuizEditPage({ quizName, setQuizName }: QuizEditPageProps) {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  console.log("QuizEditPage component: courseId =", courseId, ", quizId =", quizId);

  return (
    <div>
      <QuizEdit quizName={quizName} setQuizName={setQuizName} />
    </div>
  );
}

export default QuizEditPage;