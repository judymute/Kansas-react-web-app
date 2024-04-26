import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import * as client from "./client";
import * as quizClient from "../client";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";


interface TFProps {
  questionData: client.Question;
  quizData: quizClient.Quiz
}

const TrueAndFalse: React.FC<TFProps> = ({ questionData, quizData }) => {
  
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [quiz, setQuiz] = useState<quizClient.Quiz>(quizData);
  const [question, setQuestion] = useState<client.Question>(questionData);
  const [questions, setQuestions] = useState<client.Question[]>(quizData?.questions);
  const [answers, setAnswers] = useState<{ _id: string; value: string; correct: boolean; }[]>(questionData.answers);
  const [render, setRender] = useState("TF");

  const plsSave = async () => {

    setQuestion({ ...question, type: render });

    const updatedAnswers = [...question.answers];

    const indicesToRemove = [1, 2, 3]; // Indices of the answers you want to remove
    indicesToRemove.sort((a, b) => b - a); // Sort indices in descending order to avoid affecting subsequent indices
    indicesToRemove.forEach(index => {
      updatedAnswers.splice(index, 1);
    });

    setQuestion({ ...question, answers: updatedAnswers});

    console.log('Saving question test:', question?.name, question?.value, question?.type);

    // Update the question on the server
    const updatedQuestion = await client.updateQuestion(question);
    console.log('Updated question test:', updatedQuestion?.name);
  
    // Update the local question state with the updated question data
    setQuestion(updatedQuestion);
  
    // Fetch the latest quiz data from the server
    // if doesn't work, use quizData
    const latestQuiz = await quizClient.findQuizById(quiz._id);
    console.log('Latest quiz test:', latestQuiz);
  
    // Update the quiz with the latest question data
    const updatedQuestions = latestQuiz.questions.map((q : client.Question) => q._id === updatedQuestion._id ? updatedQuestion : q);
    const updatedQuiz = { ...latestQuiz, questions: [...updatedQuestions, updatedQuestion] };
    await quizClient.updateQuiz(updatedQuiz);
    console.log('Updated quiz test:', updatedQuiz);
  
    // Update the local state with the updated quiz data
    setQuiz(updatedQuiz);
  };

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
              // console.log('Question name changed to:', question.name);
            }}
          />
          <h6>points:</h6>
          <input
            type="string"
            style={{ width: 150 }}
            value={question?.points}
            onChange={(e) => {
              setQuestion({ ...question, points: e.target.value })
              // console.log('Question points changed to:', question.points);
            }}
          />
        </div>
        <div>

      <h6>Enter the question and answer below. Check the checkbox if the answer is true. Leave it blank if the answer is false.</h6>
      <h4>Question:</h4>
      <input
        type="text"
        value={question?.value}
        onChange={(e) => {
          setQuestion({ ...question, value: e.target.value})
          console.log('Question changed to:', question.value);
        }}
      />
      <br />
      <h6>answer:</h6>
      <input
        type="text"
        value={answers[0]?.value}
        onChange={(e) => {
          const updateAnswer0 = [...question.answers];
          updateAnswer0[0].value = e.target.value;
          setQuestion({...question, answers: updateAnswer0})
          console.log('Aswer changed to:', answers[0].value);
        }}
      />
      <br />
      <input
                  type="checkbox"
                  checked={answers[0]?.correct}
                  onChange={(e) => {
                    const updateTF = [...question.answers];
                    updateTF[0].correct = e.target.checked;
                    setQuestion({...question, answers: updateTF})
                    console.log('Aswer changed to:', answers[0].correct);
                  }}
                />
      
    </div>
      </div>
      <button onClick={plsSave}>Save Question</button>
    </div>
  </div>
  );
};

export default TrueAndFalse;

