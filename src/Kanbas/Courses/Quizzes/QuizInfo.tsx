import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";

interface QuizInfoProps {
  quizData: client.Quiz | null;
}

const QuizInfo: React.FC<QuizInfoProps> = ({ quizData }) => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<client.Quiz | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(quizId!);
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
      {quizData && (
        <div>
          <h2>{quizData.name}</h2>
          <p>Quiz Type: {quizData.quizType}</p>
          <p>Points: {quizData.points}</p>
          <p>Assignment Group: {quizData.assignmentGroup}</p>
          <p>Shuffle Answers: {quizData.shuffleAnswers ? 'Yes' : 'No'}</p>
          <p>Time Limit: {quizData.timeLimit}</p>
          <p>Multiple Attempts: {quizData.allowMultipleAttempts ? 'Yes' : 'No'}</p>
          <p>Quiz Score to Keep: {quizData.quizScoreToKeep}</p>
          <p>Allowed Attempts: {quizData.allowedAttempts}</p>
          <p>Show Correct Answers: {quizData.showCorrectAnswers}</p>
          <p>One Question at a Time: {quizData.showOneQuestionAtATime ? 'Yes' : 'No'}</p>
          <p>Due: {quizData.dueDate}</p>
          <p>Available from: {quizData.availableFrom}</p>
          <p>Until: {quizData.untilDate}</p>
        </div>
      )}
    </div>
  );
}

export default QuizInfo;