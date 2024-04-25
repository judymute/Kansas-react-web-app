import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";
import * as client from "./client";
import AddedQuestion from './addedQuestion';

function Questions() {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  console.log('Questions component rendered with quizId:', quizId);

  const [currentQ, setCurrentQ] = useState({
    _id: "1121312",
    name: "Q Name",
    points: "1",
    quiz: quizId,
    type: "MC"
  });
  console.log('Initial currentQ state:', currentQ);

  const fetchCurrent = async () => {
    try {
      const Q = await client.current();
      console.log('Fetched current question:', Q);
      setCurrentQ(Q);
    } catch (err) {
      console.error('Error fetching current question:', err);
    }
  };

  useEffect(() => {
    console.log('Fetching current question...');
    fetchCurrent();
  }, []);

  // creating a question
  const [questions, setQuestions] = useState<client.Question[]>([]);
  const [question, setQuestion] = useState<client.Question>({
    _id: "", name: "", points: "", quiz: "",
    type: "MC", answers: [{
      _id: "",
      value: "",
      correct: false,
    }]
  });

  const fetchQuestions = async () => {
    try {
      const questions = await client.findAllQuestions();
      console.log('Fetched questions:', questions);
      setQuestions(questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  useEffect(() => {
    console.log('Fetching questions...');
    fetchQuestions();
  }, []);

  const createQuestion = async () => {
    try {
      const newQuestion = await client.createQuestion(currentQ);
      console.log('Created new question:', newQuestion);
      setQuestions([newQuestion, ...questions]);
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  const [showComponent, setShowComponent] = useState(false);

  const handleToggle = () => {
    setShowComponent(prevShowComponent => !prevShowComponent); // Toggle the state
  };

  return (
    <div>
      <div className='debug'>
        <div className="question">
          <div className="header" style={{ backgroundColor: 'transparent' }}>
          </div>
        </div>
        <button onClick={() => {createQuestion(); handleToggle();}}>Add Question</button>
        {showComponent && <ComponentToRender />}
      </div>
    </div>
  );
}

function ComponentToRender() {
  return <div>
    <AddedQuestion/>
    </div>;
}

export default Questions;