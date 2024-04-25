import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";
import * as client from "./client";

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
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const toggleNewQuestionForm = () => {
    setShowNewQuestionForm(!showNewQuestionForm);

    // Create a new question when "+ New Question" button is clicked
    if (!showNewQuestionForm) {
      createQuestion();
    }
  };
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

  const [selectedOption, setSelectedOption] = useState('multipleChoice');
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    console.log('Selected option changed to:', selectedValue);
    setSelectedOption(selectedValue);
    setCurrentQ(prevCurrentQ => ({
      ...prevCurrentQ,
      type: selectedValue
    }));
  };

  const renderComponent = () => {
    console.log('Rendering question component based on selectedOption:', selectedOption);
    switch (selectedOption) {
      case 'MC':
        return <MultipleChoice />;
      case 'TF':
        return <TrueAndFalse />;
      case 'BLANK':
        return <FillBlank />;
      default:
        return <MultipleChoice />;
    }
  };

  const save = async () => {
    console.log('Saving question:', currentQ);
    if (currentQ && currentQ._id) {
      try {
        await client.updateQuestion(currentQ);
        console.log('Updated question:', currentQ);
      } catch (err) {
        console.error('Error updating question:', err);
      }
    } else if (currentQ) {
      try {
        const newQuestion = await client.createQuestion(currentQ);
        console.log('Created new question:', newQuestion);
        setQuestions([newQuestion, ...questions]);
      } catch (err) {
        console.error('Error creating question:', err);
      }
    } else {
      console.error('Invalid question object:', currentQ);
      // Handle the case when currentQ is null or invalid
    }
  };

  console.log('Rendering Questions component');

  return (
    <div>
      <div className='debug'>
        <button onClick={toggleNewQuestionForm}>+ New Question</button>
        {showNewQuestionForm && (
          <div className="new-question-form">
            <div className="header" style={{ backgroundColor: 'transparent' }}>
              <input
                type="text"
                style={{ width: 150 }}
                value={currentQ?.name || ''}
                onChange={(e) => {
                  const newName = e.target.value;
                  console.log('Question name changed to:', newName);
                  setCurrentQ(prevCurrentQ => ({
                    ...prevCurrentQ,
                    name: newName
                  }));
                }}
              />
              <select value={selectedOption} onChange={handleChange}>
                <option value="MC">Multiple Choice</option>
                <option value="TF">True or False</option>
                <option value="BLANK">Fill in the Blank</option>
              </select>
              <h6>points:</h6>
              <input
                type="string"
                style={{ width: 150 }}
                value={currentQ?.points || ''}
                onChange={(e) => {
                  const newPoints = e.target.value;
                  console.log('Question points changed to:', newPoints);
                  setCurrentQ(prevCurrentQ => ({
                    ...prevCurrentQ,
                    points: newPoints
                  }));
                }}
              />
            </div>
            {renderComponent()}
          </div>
        )}
        <button onClick={save}>Save Question</button>
      </div>

      <Routes>
        <Route path="multipleChoice" element={<MultipleChoice />} />
        <Route path="trueFalse" element={<TrueAndFalse />} />
        <Route path="fillBlank" element={<FillBlank />} />
      </Routes>
    </div>
  );
}

export default Questions;