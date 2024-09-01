import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import './CreateTest.css';

const CreateTest = () => {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 0) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = () => {
    // TODO: backend
    console.log(questions);
    setQuestions([]);
  };

  return (
    <div>
      <h2>Create a New Test</h2>
      <QuestionForm addQuestion={handleAddQuestion} />
      <h3 id="your-questions-label">Your questions:</h3>
      {questions.length === 0 ? (
        <p id="no-questions">No questions provided.</p>
      ) : (
        <ol type="1">
          {questions.map((q, index) => (
            <li key={index}>
              <div className="question-container">
                <div className="question">{q.question}</div>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="remove-question-button"
                >
                  Remove
                </button>
              </div>
              <ol type="A">
                {q.answers.map((a, idx) => (
                  <li
                    key={idx}
                    className={a.correct ? 'answer correct' : 'answer incorrect'}
                  >
                    {a.text}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      )}
      <button className="submit-test-button" onClick={handleSubmit} disabled={questions.length < 1}>Submit Test</button>
    </div>
  );
};

export default CreateTest;
