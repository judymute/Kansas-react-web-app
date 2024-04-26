import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import * as client from "./client";
import QuizEdit from "./QuizEdit";

interface QuizPrevProps {
  quizData: client.Quiz | null;
}

const QuizPreview: React.FC<QuizPrevProps> = ({ quizData }) => {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [quiz, setQuiz] = useState<client.Quiz | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(quizId!);
        console.log("fecthed quiz", fetchedQuiz)
        setQuiz(fetchedQuiz);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{quiz.name}</h2>
      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`}>
        <button>Edit</button>
      </Link>
      {quiz && (
        <div>
          <p>Name: {quiz.name}</p>
          <p>Quiz Type: {quiz.quizType}</p>
          <p>Points: {quiz.points}</p>
          <p>Assignment Group: {quiz.assignmentGroup}</p>
          <p>Shuffle Answers: {quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
          <p>Time Limit: {quiz.timeLimit}</p>
          <p>Multiple Attempts: {quiz.allowMultipleAttempts ? 'Yes' : 'No'}</p>
          <p>Show Correct Answers: {quiz.showCorrectAnswers ? 'Yes' : 'No'}</p>
          <p>One Question at a Time: {quiz.showOneQuestionAtATime ? 'Yes' : 'No'}</p>
          {/* <p>Due: {quiz.dueDate.toString()}</p>
          <p>Available from: {quiz.availableFrom.toString()}</p>
          <p>Until: {quiz.untilDate.toString()}</p>  */}
        </div>
      )}
      <Routes>
        <Route path="/edit/*" element={<QuizEdit quizData={quiz!} />} />
      </Routes>
    </div>
  );
}

export default QuizPreview;