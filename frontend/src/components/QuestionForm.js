import React, { useState } from 'react';
import './QuestionForm.css';

const QuestionForm = ({ addQuestion }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([{ text: '', correct: false }, { text: '', correct: false }]);

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], text: event.target.value };
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index, event) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      correct: i === index ? event.target.checked : false,
    }));
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, { text: '', correct: false }]);
    }
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 2) {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    if (checkCorrectness()) {
      addQuestion({ question, answers });
      setQuestion('');
      setAnswers([{ text: '', correct: false }, { text: '', correct: false }]);
    } else {
      alert('Please ensure all answers are filled and at least one answer is marked as correct.');
    }
  };

  const checkCorrectness = () => {
    if (question && answers.every(a => a.text) && answers.some(a => a.correct)) {
      return true;
    }
    return false;
  }

  return (
    <div className="question-form">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="question-input"
      />
      {answers.map((answer, index) => (
        <div key={index} className="answer-container">
          <input
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(index, e)}
            placeholder="Enter answer"
            className="answer-input"
          />
          <label>
            <input
              type="checkbox"
              checked={answer.correct}
              onChange={(e) => handleCorrectChange(index, e)}
              disabled={answers.filter(a => a.correct).length === 1 && !answer.correct}
              className="correct-checkbox"
            />
            Correct
          </label>
          <button
            type="button"
            onClick={() => handleRemoveAnswer(index)}
            disabled={answers.length <= 2}
            className="remove-answer-button"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAnswer}
        disabled={answers.length >= 4}
        className="add-button"
      >
        Add Answer
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!checkCorrectness()}
        className="submit-button"
      >
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm;
