import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from '../services/GetQuiz';
import '../assets/FindTest.css';

const FindTest = () => {
  const [testId, setTestId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (testId.trim() === '') {
      alert('Please enter Test\'s public ID!');
      return;
    }

    try {
      await Quiz.getQuizName({ 'quizPublicID': testId });
      navigate(`/test/${testId}`)
    } catch (err) {
      alert('A Test with provided public ID has not been found!');
      setTestId('');
    }
  };

  return (
    <div>
      <h2>Take a Test</h2><br />
      <input
        className="take-test-input"
        type="text"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
        placeholder="Enter Test's public ID"
      /><br />
      <button className="take-test-button" onClick={handleSubmit}>Start Test</button>
    </div>
  );
};

export default FindTest;
