import React, { useState } from 'react';
import "./QuizEdit.css";
import { Editor } from '@tinymce/tinymce-react';
import * as client from "./client";
import { useParams } from 'react-router';

// need this prop interface so it can be pass this preference to the Quizzes component and aid QuizInfo component rendering
interface QuizDetailsProps {
  onSave: (quizPreferences: Partial<client.Quiz>) => void;
  quizData: client.Quiz;
}


const  QuizDetails: React.FC<QuizDetailsProps> = ({quizData, onSave }) => {
  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();

  
  const [quiz, setQuiz] = useState<client.Quiz>(quizData);

  const [quizType, setQuizType] = useState('Graded Quiz');
  const [assignmentGroup, setAssignmentGroup] = useState('Quizzes');
  const [showCorrectAnswers, setShowCorrectAnswers] = useState('Let Students See The Correct Answers');
  const [showOneQuestionAtATime, setShowOneQuestionAtATime] = useState(false);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(true);
  const [quizScoreToKeep, setQuizScoreToKeep] = useState('Highest');
  const [allowedAttempts, setAllowedAttempts] = useState('');
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [timeLimit, setTimeLimit] = useState('');
  const [onlyAfterLastAttempt, setOnlyAfterLastAttempt] = useState(false);

  const handleSave = () => {
    const quizPreferences: Partial<client.Quiz> = {
      quizType,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      allowMultipleAttempts,
      showCorrectAnswers,
      showOneQuestionAtATime,
      // other preferences
    };
    onSave(quizPreferences);
  };

  const save = async () => {
    console.log('updating quiz:', quiz);
    await client.updateQuiz(quiz);
    setQuiz(quiz)
  };


  return (
    <div>
      <button onClick={save}>Save Quiz</button>
      <input
          type="text"
          value={quiz?.name}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
      />
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
        initialValue= {"please enter new quiz details here for " + quiz?.name}
      />
      <br />
      <div className="quiz-settings">
        <div className="setting-item-container">
          { /* Setting Items */}
          <div className="setting-item">
            <label htmlFor="quizType">Quiz Type:</label>
            <select
              id="quizType"
              value={quiz?.quizType}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
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
              value={quiz?.assignmentGroup}
              onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>
        <div>
          { /* More Settings and Options */}
          <div className="option-header">Options</div>
          <br />
          <label>
            <input
              type="checkbox"
              checked={quiz?.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
            Shuffle Answers
          </label>
          <div className="time-limit-container">
            <label>
            <input
                  type="string"
                  id="timeLimit"
                  value={quiz?.timeLimit}
                  onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value})}
                />
              Time Limit
            </label>
          </div>
          <div className='quiz-settings'>
            <div className='attempt-settings'>
              <label>
                <input
                  type="checkbox"
                  checked={quiz?.allowMultipleAttempts}
                  onChange={(e) => setQuiz({ ...quiz, allowMultipleAttempts: e.target.checked})}
                />
                Allow Multiple Attempts
              </label>
            </div>
            <div className='responses-settings'>
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
                  {allowedAttempts !== '' && (
                    <label>
                      <input
                        type="checkbox"
                        checked={onlyAfterLastAttempt}
                        onChange={(e) => setOnlyAfterLastAttempt(e.target.checked)}
                      />
                      Only After Their Last Attempt
                    </label>
                  )}
                  <label>
                    <input type="checkbox" />
                    Only Once After Each Attempt
                  </label>
                  <label>
                    <input type="checkbox" />
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
    </div>
  );
};

export default QuizDetails;
