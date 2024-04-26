import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import * as client from "./client";
import * as quizClient from "../client";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";


interface MCProps {
  questionData: client.Question;
  quizData: quizClient.Quiz
}

const MultipleChoice: React.FC<MCProps> = ({ questionData, quizData }) => {
  
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [quiz, setQuiz] = useState<quizClient.Quiz>(quizData);
  const [question, setQuestion] = useState<client.Question>(questionData);
  const [answers, setAnswers] = useState<{ _id: string; value: string; correct: boolean; }[]>(questionData.answers);
  
  const updateCorrectAnswer = (answerId : string, 
    //answer : [] see comment when function is called
    ) => {
    const newAnswers = question.answers.slice();

        const index = newAnswers.findIndex(a => a._id === answerId);
        if (index !== -1) {
          // newAnswers[index] = answer;
        }
        setAnswers(newAnswers);


  }

  return (
    <div>
      <h6>Enter your question and multiple answers. then select the correct answer.</h6>
      <h4>Question:</h4>
      <input
        type="text"
        name="textInput1"
        value={question.value}
        onChange={(e) => {
          setQuestion({ ...question, value: e.target.value})
          console.log('Question changed to:', question.value);
        }}
      />
      
      <h4>Answers:</h4>
      <br />
      <h6>correct answer:</h6>
      <input
        type="text"
        name="textInput1"
        value={answers[0]?.value}
        placeholder='option1'
        onChange={(e) => {
          updateCorrectAnswer(answers[0]?._id, 
            //answers[0] don't know how to pass the entire answer in?
            );
          console.log('Correct answer changed to:', answers[0].value);
        }}
      />
      <br />
      <h6>possible answer:</h6>
      <input
        type="text"
        value={answers[1]?.value}
        placeholder='option 2'
        onChange={(e) => {
          updateCorrectAnswer(answers[1]?._id, 
            //answers[0] don't know how to pass the entire answer in?
            );
          console.log('Possible answer 1 changed to:', answers[1].value);
        }}
      />
      <br />
      <h6>possible answer:</h6>
      <input
        type="text"
        value={answers[2]?.value}
        placeholder='option 2'
        onChange={(e) => {
          updateCorrectAnswer(answers[2]?._id, 
            //answers[0] don't know how to pass the entire answer in?
            );
          console.log('Possible answer 1 changed to:', answers[2].value);
        }}
      />
      <br />
      <h6>possible answer:</h6>
      <input
        type="text"
        value={answers[3]?.value}
        placeholder='option 2'
        onChange={(e) => {
          updateCorrectAnswer(answers[3]?._id, 
            //answers[0] don't know how to pass the entire answer in?
            );
          console.log('Possible answer 1 changed to:', answers[3].value);
        }}
      />
      <br />
    </div>
  );
};

export default MultipleChoice;
