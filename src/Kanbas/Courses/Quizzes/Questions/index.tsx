import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";
import * as client from "./client";

function Questions() {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [currentQ, setCurrentQ] = useState({ name: "Q Name", points: "1", quiz: quizId, type: "MC" });
  const fetchCurrent = async () => {
    const Q = await client.current();
    setCurrentQ(Q);
  };
  useEffect(() => {
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
  }]});
  const fetchQuestions = async () => {
    const questions = await client.findAllQuestions();
    setQuestion(questions);
  };
  useEffect(() => { fetchQuestions(); }, []);

  const createQuestion = async () => {
    try {
      const newQuestion = await client.createQuestion(question);
      setQuestions([newQuestion, ...questions]);
    } catch (err) {
      console.log(err);
    }
  };

    const [selectedOption, setSelectedOption] = useState('multipleChoice');
    const navigate = useNavigate();

    const handleChange = (event: any) => {
      // const option = "trueFalse";
      setSelectedOption(event.target.value);
      // console.log(`Attempting to navigate to ${option}`)
      setCurrentQ({ ...currentQ, type: event.target.value })
    };

    const renderComponet = () => {
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
    }

    const save = async () => {
      await client.updateQuestion(currentQ);
    };

    return (

      <div>
        <div className='debug'>
          <div className="question">
            <div className="header" style={{ backgroundColor: 'transparent' }}>
              <input type="text" style={{ width: 150 }} value={currentQ.name} onChange={(e) =>
            setCurrentQ({ ...currentQ, name: e.target.value })}/>
              <select value={selectedOption} onChange={handleChange}>
                <option value="MC">
                  Multiple Choice
                </option>
                <option value="TF">
                  True or False
                </option>
                <option value="BLANK">
                  Fill in the Blank
                </option>
              </select>
              <h6>points:</h6>
              <input type="string" style={{ width: 150 }} value={currentQ.points} onChange={(e) =>
            setCurrentQ({ ...currentQ, points: e.target.value })}/>
              </div>
              {renderComponet()}
          </div>
          <button onClick={save}>
            Save Question
          </button>
          <button onClick={createQuestion}>
            Add Question
          </button>
        </div>

        <Routes>
          <Route path="multipleChoice" element={<MultipleChoice />} />
          <Route path="trueFalse" element={<TrueAndFalse />} />
          <Route path="fillBlank" element={<FillBlank />} />
        </Routes>
      </div>
    );
  };

  export default Questions;
