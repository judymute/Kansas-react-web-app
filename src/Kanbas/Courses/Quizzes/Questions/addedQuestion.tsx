import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";
import * as client from './client';


interface AddedQuestionProps {
  questionData: client.Question;
}

const AddedQuestion: React.FC<AddedQuestionProps> = ({ questionData }) => {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();

  console.log('AddedQuestion component rendered with quizId:', quizId, 'and question:', questionData);

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
  const [newQuestion, setNewQuestion] = useState<client.Question>({
    _id: "", // this should ideally be generated or fetched if necessary
    name: "",
    points: "1", // Make sure this is a string if your type expects a string; otherwise, adjust the type or value accordingly
    quiz: quizId || "",
    type: "MC",
    answers: [{
      _id: "", // Same here, generate or handle these IDs correctly
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
    } else {
      console.error('Invalid question object:', currentQ);
      // Handle the case when currentQ doesn't have a valid _id
      // You can show an error message or create a new question instead
    }
  };

  console.log('Rendering Questions component');

  return (
    <div>
      <div className='debug'>
        <div className="question">
          <div className="header" style={{ backgroundColor: 'transparent' }}>
            <input
              type="text"
              style={{ width: 150 }}
              value={currentQ?.name}
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
              value={currentQ?.points}
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

export default AddedQuestion;