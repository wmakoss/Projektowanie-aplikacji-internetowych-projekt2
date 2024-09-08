import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import submitQuiz from '../services/SubmitQuiz';
import './CreateTest.css';

const CreateTest = () => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 0) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = async () => {
    if (quizName.trim() === '') {
      alert('Please enter Test\'s name!');
      return;
    }

    try {
      const quizIDs = await submitQuiz({ 'name': quizName }, questions);
      alert(`The Test has been created successfully.\nTest's public ID: ${quizIDs.quizPublicID}\nTest's private ID: ${quizIDs.quizPrivateID}`);
      setQuizName('');
      setQuestions([]);
      navigate('/')
    } catch (err) {
      alert(`An error has occured: ${err}`);
    }
  };

  return (
    <div>
      <h2>Create a new Test</h2><br />
      <input
        type="text"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        placeholder="Enter your Test's name"
        className="quiz-name-input"
      /><br />
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
