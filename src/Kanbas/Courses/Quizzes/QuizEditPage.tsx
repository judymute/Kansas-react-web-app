// src/Kanbas/Courses/Quizzes/QuizEditPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import QuizEdit from './QuizEdit';
import { Quiz } from './type';


function QuizEditPage() {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  console.log("QuizEditPage: courseId =", courseId, ", quizId =", quizId);

  return (
    <div>
    </div>
  );
}

export default QuizEditPage;