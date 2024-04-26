import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddedQuestion from './addedQuestion';
import * as client from "./client";
import * as quizClient from "../client";
import { v4 as uuidv4 } from 'uuid';


interface AddedQuizProps {
  quizData: quizClient.Quiz;
}

const Questions: React.FC<AddedQuizProps> = ({ quizData }) =>  {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  const [quiz, setQuiz] = useState<quizClient.Quiz>(quizData);
  const [questions, setQuestions] = useState<client.Question[]>(quizData?.questions); // Array to store question components, currently empty


  useEffect(() => {
    // need to fetch all questions that have this specific quizID
    const fetchQuestions = async (quiz: string) => {
      try {
        const fetchedQuestions = await client.findQuestionsByQuiz(quiz);
        console.log('Fetched questions:', fetchedQuestions);
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    console.log('Fetching questions...');
    fetchQuestions(quiz?._id); // uses the id of the current quiz
  }, []); 

  const addNewQuestion = async () => {
    // Creating a new question template with unique IDs
    // this is not being updated!
    const newQuestionTemplate = {
      _id: uuidv4(),
      name: "New Question",
      points: "1",
      quiz: quizId,
      type: "MC",
      value: "What is this question asking?",
      answers: [{
        _id: uuidv4(),
        value: "this the correct answer",
        correct: true
      },
      {
        _id: uuidv4(),
        value: "this possible answer 2",
        correct: false
      },
      {
        _id: uuidv4(),
        value: "this possible answer 3",
        correct: false
      },
      {
        _id: uuidv4(),
        value: "this possible answer 4",
        correct: false
      }
     ]
    };

    try {
      const newQuestion = await client.createQuestion(newQuestionTemplate);
      setQuestions(questions => [...questions, newQuestion]); // if questions aren't updating on quiz end, may need to fix set quiz
      console.log('Created new question:', newQuestion);
      const updatedQuiz = {...quiz, questions: questions};
      await quizClient.updateQuiz(updatedQuiz);
      setQuiz(updatedQuiz)
      console.log('Updated the quiz to have new question:', quiz.questions);
    } catch (err) {
      console.error('Error creating question:', err);
    }
  };

  return (
    <div>
      <button onClick={addNewQuestion}>Add New Question</button>
      <div className="question-list">
        {questions?.map(question => (
          <div key={question._id}>
            <AddedQuestion questionData={question!} quizData={quiz!}/>
            <hr/>
          </div>
     
        ))}
      </div>
    </div>
  );
  
}

export default Questions;
