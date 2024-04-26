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

  // want to clear the answers array entirely, replace with one single answer that is either true or false and make 
  // it the new question.answers array

  return (
    <div>
      <h6>Enter your question and whether it is true or false</h6>
      <h4>Question:</h4>
      <Editor
        apiKey="fs2c55cug8z5w3kuhlmwxmi3m1l70aalp26lnptmbi0qeo79"
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
        }}
        initialValue="Welcome to TinyMCE!"
      />
      <h4>answers:</h4>
      <br />
      {/* put a checkbox here, if it is checked the answer will be true */}

      <br />
    </div>
  );
};

export default TrueAndFalse;

