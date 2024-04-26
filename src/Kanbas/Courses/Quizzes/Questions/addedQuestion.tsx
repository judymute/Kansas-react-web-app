import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";
import * as client from './client';
import * as quizClient from "../client";
import Questions from '.';


interface AddedQuestionProps {
  questionData: client.Question;
  quizData: quizClient.Quiz
}

const AddedQuestion: React.FC<AddedQuestionProps> = ({ questionData, quizData }) => {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [quiz, setQuiz] = useState<quizClient.Quiz>(quizData);
  const [question, setQuestion] = useState<client.Question>(questionData);
  const [questions, setQuestions] = useState<client.Question[]>(quizData?.questions);

  console.log('AddedQuestion component rendered with quizId:', quizId, 'and question:', questionData);

//   const [currentQ, setCurrentQ] = useState({
//     _id: "1121312",
//     name: "Q Name",
//     points: "1",
//     quiz: quizId,
//     type: "MC"
//   });
//   console.log('Initial currentQ state:', currentQ);


  const renderComponent = () => {
    console.log('Rendering question component based on selectedOption:', question.type);
    switch (question.type) {
      case 'MC':
        return <MultipleChoice questionData={question} quizData={quiz!} />;
      case 'TF':
        return <TrueAndFalse questionData={question} quizData={quiz!} />;
      case 'BLANK':
        return <FillBlank questionData={question} quizData={quiz!}  />;
      default:
        return <MultipleChoice questionData={question} quizData={quiz!} />;
    }
  };

  const save = async () => {
    console.log('Saving question:', question);

  
    // Update the question on the server
    const updatedQuestion = await client.updateQuestion(question);
    console.log('Updated question:', updatedQuestion);
  
    // Update the local question state with the updated question data
    setQuestion(updatedQuestion);
  
    // Fetch the latest quiz data from the server
    const latestQuiz = await quizClient.findQuizById(quiz._id);
    console.log('Latest quiz:', latestQuiz);
  
    // Update the quiz with the latest question data
    const updatedQuestions = latestQuiz.questions.map((q : client.Question) => q._id === updatedQuestion._id ? updatedQuestion : q);
    const updatedQuiz = { ...latestQuiz, questions: [...updatedQuestions, updatedQuestion] };
    await quizClient.updateQuiz(updatedQuiz);
    console.log('Updated quiz:', updatedQuiz);
  
    // Update the local state with the updated quiz data
    setQuiz(updatedQuiz);
  };

  console.log('Rendering Questions component');

  // we want to render each question in an editable state
  // each question is being mapped to AddedQuestion one at a time
  return (
    <div>
      <div className='debug'>
        <div className="question">
          <div className="header" style={{ backgroundColor: 'transparent' }}>
            <input
              type="text"
              style={{ width: 150 }}
              value={question?.name}
              onChange={(e) => {
                setQuestion({ ...question, name: e.target.value })
                console.log('Question name changed to:', question.name);
              }}
            />
            <select value={question?.type}
              onChange={(e) => {
                setQuestion({ ...question, type: e.target.value })
                console.log('Question type changed to:', question.type);
              }}>
              <option value="MC">Multiple Choice</option>
              <option value="TF">True or False</option>
              <option value="BLANK">Fill in the Blank</option>
            </select>
            <h6>points:</h6>
            <input
              type="string"
              style={{ width: 150 }}
              value={question?.points}
              onChange={(e) => {
                setQuestion({ ...question, points: e.target.value })
                console.log('Question points changed to:', question.points);
              }}
            />
          </div>
          {renderComponent()}
        </div>
        <button onClick={save}>Save Question</button>
      </div>

      <Routes>
        <Route path="multipleChoice" element={<MultipleChoice questionData={question!} quizData={quiz!}/>} />
        <Route path="trueFalse" element={<TrueAndFalse questionData={question!} quizData={quiz!}/>} />
        <Route path="fillBlank" element={<FillBlank questionData={question!} quizData={quiz!}/>} />

      </Routes>
    </div>
  );
}

export default AddedQuestion;