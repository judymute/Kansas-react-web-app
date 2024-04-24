import React, { useCallback, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";

function Questions() {
  const [selectedOption, setSelectedOption] = useState('multipleChoice');
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    // const option = "trueFalse";
    setSelectedOption(event.target.value);
    // console.log(`Attempting to navigate to ${option}`)
  };

  const renderComponet = () => {
    switch (selectedOption) {
      case 'option 1':
        return <MultipleChoice />;
      case 'option 2':
        return <TrueAndFalse />;
      case 'option 3':
        return <FillBlank />;
      default:
        return <MultipleChoice />;

    }
  }



  return (

    <div>
      <h2>Quiz Questions</h2>
      <div className='debug'>
        <div className="question">
          <div className="header" style={{ backgroundColor: 'transparent' }}>
            <input type="text" style={{ width: 120 }}
              name="question_name" />
            <input type="hidden" value="" />
            <select value={selectedOption} onChange={handleChange}>
              <option value="option 1">
                Multiple Choice
              </option>
              <option value="option 2">
                True or False
              </option>
              <option value="option 3">
                Fill in the Blank
              </option>
            </select>
            {renderComponet()}
          </div>
        </div>

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
