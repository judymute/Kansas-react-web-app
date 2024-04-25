// src/Kanbas/Courses/Quizzes/QuizEditPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { QuizEdit } from './QuizEdit';
import { Quiz } from './type';

interface QuizEditPageProps {
  quizName?: string;
  setQuizName?: (name: string) => void;
  addQuiz: (quiz: Quiz) => void;
}


function QuizEditPage({ quizName = 'Unnamed Quiz', setQuizName = () => {}, addQuiz }: QuizEditPageProps) {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  console.log("QuizEditPage: courseId =", courseId, ", quizId =", quizId);

  return (
    <div>
   <QuizEdit quizName={quizName} setQuizName={setQuizName} addQuiz={addQuiz} />
    </div>
  );
}

export default QuizEditPage;