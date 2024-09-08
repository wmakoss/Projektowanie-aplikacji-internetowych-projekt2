import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Answers from '../services/GetAnswers';
import './FindAnswers.css';

const FindAnswers = () => {
  const [answerId, setAnswerId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (answerId.trim() === '') {
      alert('Please enter your answers\' private ID!');
      return;
    }

    try {
      await Answers.getScore({ 'answerPrivateID': answerId });
      navigate(`/checkAnswers/${answerId}`)
    } catch (err) {
      alert('Answers with provided private ID have not been found!');
      setAnswerId('');
    }
  };

  return (
    <div>
      <h2>Check your answers</h2><br />
      <input
        className="check-answers-input"
        type="text"
        value={answerId}
        onChange={(e) => setAnswerId(e.target.value)}
        placeholder="Enter answers' private ID"
      /><br />
      <button className="check-answers-button" onClick={handleSubmit}>Check answers</button>
    </div>
  );
};

export default FindAnswers;
