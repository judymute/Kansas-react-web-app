import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddedQuestion from './addedQuestion';
import * as client from "./client";
import { v4 as uuidv4 } from 'uuid';

function Questions() {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [questions, setQuestions] = useState<client.Question[]>([]); // Array to store question components

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await client.findAllQuestions();
        console.log('Fetched questions:', fetchedQuestions);
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    console.log('Fetching questions...');
    fetchQuestions();
  }, []);
  const addNewQuestion = async () => {
    // Creating a new question template with unique IDs
    const newQuestionTemplate = {
      _id: uuidv4(),
      name: "New Question",
      points: "1",
      quiz: quizId,
      type: "MC",
      answers: [{
        _id: uuidv4(),
        value: "",
        correct: false
      }]
    };

    try {
      const newQuestion = await client.createQuestion(newQuestionTemplate);
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
      console.log('Created new question:', newQuestion);
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  return (
    <div>
      <button onClick={addNewQuestion}>Add New Question</button>
      <div className="question-list">
        {questions.map(question => (
          <div key={question._id}>
            <AddedQuestion questionData={question} />
            <hr/>
          </div>
     
        ))}
      </div>
    </div>
  );
  
}

export default Questions;
