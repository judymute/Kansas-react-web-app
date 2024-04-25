import React, { useState } from 'react';
import "./QuizEdit.css";
import { Editor } from '@tinymce/tinymce-react';

const QuizDetails = () => {
  const [quizType, setQuizType] = useState('Graded Quiz');
  const [assignmentGroup, setAssignmentGroup] = useState('Quizzes');
  const [showOneQuestionAtATime, setShowOneQuestionAtATime] = useState(false);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(true);
  const [quizScoreToKeep, setQuizScoreToKeep] = useState('Highest');
  const [allowedAttempts, setAllowedAttempts] = useState('');
  const [shuffleAnswers, setShuffleAnswers] = useState(false);
  const [timeLimit, setTimeLimit] = useState('');

  const [onlyOnceAfterEachAttempt, setOnlyOnceAfterEachAttempt] = useState(false);

  // separate states for each show answers/responses
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [showQuizResponses, setShowQuizResponses] = useState(false);

  // separate states for each only after each attempt checkbox:
  const [onlyAfterLastAttemptAnswers, setOnlyAfterLastAttemptAnswers] = useState(false);
  const [onlyAfterLastAttemptResponses, setOnlyAfterLastAttemptResponses] = useState(false);

  const [requireAccessCode, setRequireAccessCode] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [filterIPAddresses, setFilterIPAddresses] = useState(false);
  const [ipAddresses, setIPAddresses] = useState('');


  const [assignTo, setAssignTo] = useState('Everyone');
  const [assignToSpecific, setAssignToSpecific] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');

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
          { /* Setting Items */}
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
                  <label htmlFor="quizScoreToKeep">
                    Quiz Score to Keep:
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
                  <label>
                    <input
                      type="checkbox"
                      checked={allowedAttempts !== ''}
                      onChange={(e) => setAllowedAttempts(e.target.checked ? '1' : '')}
                    />
                    Allowed Attempts:
                    {allowedAttempts !== '' && (
                      <input
                        type="number"
                        id="allowedAttempts"
                        value={allowedAttempts}
                        onChange={(e) => setAllowedAttempts(e.target.value)}
                      />
                    )}
                  </label>

                </div>
              )}
            </div>
            <div className='responses-settings'>
              <label>
                <input
                  type="checkbox"
                  checked={showQuizResponses}
                  onChange={(e) => setShowQuizResponses(e.target.checked)}
                />
                Let Students See Their Quiz Responses (Incorrect Questions Will Be Marked in Student Feedback)
              </label>
              {showQuizResponses && allowedAttempts !== '' && (
                <label>
                  <input
                    type="checkbox"
                    checked={onlyAfterLastAttemptResponses}
                    onChange={(e) => setOnlyAfterLastAttemptResponses(e.target.checked)}
                  />
                  Only After Their Last Attempt
                </label>
              )}
              <label>
                <input
                  type="checkbox"
                  checked={onlyOnceAfterEachAttempt}
                  onChange={(e) => setOnlyOnceAfterEachAttempt(e.target.checked)}
                />
                Only Once After Each Attempt
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showCorrectAnswers}
                  onChange={(e) => setShowCorrectAnswers(e.target.checked)}
                />
                Let Students See The Correct Answers
              </label>

              {showCorrectAnswers && (
                <>
                  {allowedAttempts !== '' && (
                    <label>
                      <input
                        type="checkbox"
                        checked={onlyAfterLastAttemptAnswers}
                        onChange={(e) => setOnlyAfterLastAttemptAnswers(e.target.checked)}
                      />
                      Only After Their Last Attempt
                    </label>
                  )}
                  <label className='date-input'>
                    Show Correct Answers at
                    <input
                      type="datetime-local"
                      disabled={onlyOnceAfterEachAttempt}
                    />
                  </label>
                  <label className='date-input'>
                    Hide Correct Answers at
                    <input
                      type="datetime-local"
                      disabled={onlyOnceAfterEachAttempt}
                    />
                  </label>
                </>
              )}
            </div>

          </div>
          <div>
            <label className='responses-settings' style={{ paddingBottom: '10px' }}>
              <input
                type="checkbox"
                checked={showOneQuestionAtATime}
                onChange={(e) => setShowOneQuestionAtATime(e.target.checked)}
              />
              Show one question at a time
            </label>
          </div>
        </div>

        <div className="option-header">Quiz Restrictions</div>
        <br />
        <div className='restriction-settings'>
          <label>
            <input
              type="checkbox"
              checked={requireAccessCode}
              onChange={(e) => setRequireAccessCode(e.target.checked)}
            />
            Require an access code
            {requireAccessCode && (
              <div>
                <input
                  type="text"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="ex: Password85"
                />
              </div>
            )}
          </label>

        </div>


        <div className="restriction-settings">
          <label>
            <input
              type="checkbox"
              checked={filterIPAddresses}
              onChange={(e) => setFilterIPAddresses(e.target.checked)}
            />
            Filter IP Addresses

            {filterIPAddresses && (
              <div>
                <input
                  type="text"
                  id="ipAddresses"
                  value={ipAddresses}
                  onChange={(e) => setIPAddresses(e.target.value)}
                  placeholder="ex: 192.168.217.1"
                />
              </div>
            )}
          </label>

        </div>

        <div className="assign-settings">
          <div className="option-header">Assign</div>
          <br />
          <div className="assign-to">
            <label>
              <input
                type="radio"
                value="Everyone"
                checked={assignTo === 'Everyone'}
                onChange={(e) => setAssignTo(e.target.value)}
              />
              Everyone
            </label>
            <label>
              <input
                type="radio"
                value="Specific"
                checked={assignTo === 'Specific'}
                onChange={(e) => setAssignTo(e.target.value)}
              />
              Specific
              {assignTo === 'Specific' && (
                <div>
                  <input
                    type="text"
                    id="assignToSpecific"
                    value={assignToSpecific}
                    onChange={(e) => setAssignToSpecific(e.target.value)}
                    placeholder="ex: Mastery Paths, Second Attempt, etc..."
                  />
                </div>
              )}
            </label>
          </div>
          <div className="assign-dates">
            <label className="date-input">
              Due
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <label className="date-input">
              Available from
              <input
                type="datetime-local"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </label>
            <label className="date-input">
              Until
              <input
                type="datetime-local"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizDetails;
