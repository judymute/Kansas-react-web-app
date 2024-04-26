import React, { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import MultipleChoice from './MultipleChoice';
import TrueAndFalse from './TrueAndFalse';
import FillBlank from './FillBlank';
import "./Questions.css";
import * as client from './client';
import * as quizClient from "../client";


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

  const [currentQ, setCurrentQ] = useState({
    _id: "1121312",
    name: "Q Name",
    points: "1",
    quiz: quizId,
    type: "MC"
  });
  console.log('Initial currentQ state:', currentQ);

//   const fetchCurrent = async () => {
//     try {
//       const Q = await client.current();
//       console.log('Fetched current question:', Q);
//       setCurrentQ(Q);
//     } catch (err) {
//       console.error('Error fetching current question:', err);
//     }
//   };

//   useEffect(() => {
//     console.log('Fetching current question...');
//     fetchCurrent();
//   }, []);


//   const [newQuestion, setNewQuestion] = useState<client.Question>({
//     _id: "", // this should ideally be generated or fetched if necessary
//     name: "",
//     points: "1", // Make sure this is a string if your type expects a string; otherwise, adjust the type or value accordingly
//     quiz: quizId || "",
//     type: "MC", // does this actually work?
//     value: "this is a blank question",
//     answers: [{
//       _id: "", // Same here, generate or handle these IDs correctly
//       value: "",
//       correct: false,
//     }]
// });

//   const fetchQuestions = async () => {
//     try {
//       const questions = await client.findAllQuestions();
//       console.log('Fetched questions:', questions);
//       setQuestions(questions);
//     } catch (err) {
//       console.error('Error fetching questions:', err);
//     }
//   };

//   useEffect(() => {
//     console.log('Fetching questions...');
//     fetchQuestions();
//   }, []);

//   const navigate = useNavigate();


//   const handleChange = (event: any) => {
//     const selectedValue = event.target.value;
//     console.log('Selected option changed to:', selectedValue);
//     setSelectedOption(selectedValue);
//     setCurrentQ(prevCurrentQ => ({
//       ...prevCurrentQ,
//       type: selectedValue
//     }));
//   };

  const renderComponent = () => {
    console.log('Rendering question component based on selectedOption:', question.type);
    switch (question.type) {
      case 'MC':
        return <MultipleChoice questionData={question} quizData={quiz!} />;
      case 'TF':
        return <TrueAndFalse />;
      case 'BLANK':
        return <FillBlank />;
      default:
        return <MultipleChoice questionData={question} quizData={quiz!}/>;
    }
  };

  const save = async () => {
    console.log('Saving question:', question);
    await client.updateQuestion(question);

    console.log('Saving quiz questions:', quiz.questions);

    // which question in the quizzes array of questions matches this question_id?
    // whatever question does, that one needs to be updated within the quiz

    //const foundQ = questions.find(q => q._id === question._id);

    // const index = questions.findIndex(q => q._id === question._id);
    //     if (index !== -1) {
    //     questions[index] = question;
    //     }

    // const updatedQuiz = {...quiz, questions: questions};
    // await quizClient.updateQuiz(updatedQuiz);
    // setQuiz(updatedQuiz)


    // is this save updated the quiz as well since the question exists in the quiz?
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
                setQuestion({...question, name: e.target.value})
                console.log('Question name changed to:', question.name);
              }}
            />
            <select value={question?.type} 
            onChange={(e) => {
                setQuestion({...question, type: e.target.value})
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
                setQuestion({...question, points: e.target.value})
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
        <Route path="trueFalse" element={<TrueAndFalse />} />
        <Route path="fillBlank" element={<FillBlank />} />
      </Routes>
    </div>
  );
}

export default AddedQuestion;