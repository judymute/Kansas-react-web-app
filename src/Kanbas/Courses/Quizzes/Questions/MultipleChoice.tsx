import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import * as client from "./client";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";


function MultipleChoice() {


  const [selectedOption, setSelectedOption] = useState('');
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');

  const handleRadioChange = (e: { target: { value: React.SetStateAction<string>; }; } ) => {
    setSelectedOption(e.target.value);
  };

  const handleTextInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === 'textInput1') {
      setTextInput1(value);
    } else if (name === 'textInput2') {
      setTextInput2(value);
    }
  };
  
  return (
    <div>
      <h6>Enter your question and multiple answers. then select the correct answer.</h6>
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
      <h4>Answers:</h4>
      <br />

      {/* Text input boxes */}
      <h6>correct answer:</h6>
      <input
        type="text"
        name="textInput1"
        value={textInput1}
        placeholder='option1'
        onChange={handleTextInputChange}
      />
      <br />
    </div>
  );
};

/// on single text box to add option
/// radio button to signal which option is correct
// trash and edit button next to each option

export default MultipleChoice;
