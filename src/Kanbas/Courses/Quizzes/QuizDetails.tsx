import React, { useState } from 'react';
import "./QuizEdit.css";
import { Editor } from '@tinymce/tinymce-react';

const QuizDetails = () => {
  const [quizType, setQuizType] = useState('Graded Quiz');
  const [assignmentGroup, setAssignmentGroup] = useState('Quizzes');
  const [showCorrectAnswers, setShowCorrectAnswers] = useState('Let Students See The Correct Answers');
  const [showOneQuestionAtATime, setShowOneQuestionAtATime] = useState(false);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(true);
  const [quizScoreToKeep, setQuizScoreToKeep] = useState('Highest');
  const [allowedAttempts, setAllowedAttempts] = useState('');
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [timeLimit, setTimeLimit] = useState('');

  return (
    <div>
      <h6>Quiz Instructions:</h6>
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
      <br />
      <div className="quiz-settings">
        <div className="setting-item-container">
          { /* Setting Items */ }
          <div className="setting-item">
            <label htmlFor="quizType">Quiz Type:</label>
            <select
              id="quizType"
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div className="setting-item">
            <label htmlFor="assignmentGroup">Assignment Group:</label>
            <select
              id="assignmentGroup"
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>
        <div>
          { /* More Settings and Options */ }
          <div className="option-header">Options</div>
          <br />
          <label>
            <input
              type="checkbox"
              checked={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.checked)}
            />
            Shuffle Answers
          </label>
          <div className="time-limit-container">
            <label>
              <input
                type="checkbox"
                checked={timeLimit !== ''}
                onChange={(e) => setTimeLimit(e.target.checked ? '1' : '')}
              />
              Time Limit
            </label>
            {timeLimit !== '' && (
              <span className="time-limit-input">
                <input
                  type="number"
                  id="timeLimit"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                />
                <label htmlFor="timeLimit">Minutes</label>
              </span>
            )}
          </div>
          <div className='quiz-settings'>
            <div className='attempt-settings'>
              <label>
                <input
                  type="checkbox"
                  checked={allowMultipleAttempts}
                  onChange={(e) => setAllowMultipleAttempts(e.target.checked)}
                />
                Allow Multiple Attempts
              </label>
              {allowMultipleAttempts && (
                <div>
                  <label htmlFor="quizScoreToKeep">Quiz Score to Keep:
                    <select
                      id="quizScoreToKeep"
                      value={quizScoreToKeep}
                      onChange={(e) => setQuizScoreToKeep(e.target.value)}
                    >
                      <option value="Highest">Highest</option>
                      <option value="Latest">Latest</option>
                      <option value="Average">Average</option>
                    </select>
                  </label>
                  <label htmlFor="allowedAttempts">Allowed Attempts:
                    <input
                      type="number"
                      id="allowedAttempts"
                      value={allowedAttempts}
                      onChange={(e) => setAllowedAttempts(e.target.value)}
                    />
                  </label>
                </div>
              )}
            </div>
            <label>
              <input
                type="checkbox"
                checked={showCorrectAnswers !== 'Hide Correct Answers at'}
                onChange={(e) => setShowCorrectAnswers(e.target.checked ? 'Let Students See The Correct Answers' : 'Hide Correct Answers at')}
              />
              Let Students See Their Quiz Responses (Incorrect Questions Will Be Marked in Student Feedback)
            </label>
            {showCorrectAnswers === 'Let Students See The Correct Answers' && (
              <div>
                <label>
                  <input type="radio" checked readOnly />
                  Let Students See The Correct Answers
                </label>
                <label>
                  Show Correct Answers at
                  <input type="datetime-local" />
                </label>
                <label>
                  Hide Correct Answers at
                  <input type="datetime-local" />
                </label>
              </div>
            )}
            <label>
              <input
                type="checkbox"
                checked={showOneQuestionAtATime}
                onChange={(e) => setShowOneQuestionAtATime(e.target.checked)}
              />
              Show one question at a time
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
