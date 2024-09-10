import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getTestResponses from '../services/GetResponses';
import '../assets/FindTestResponses.css';

const FindTestResponses = () => {
  const [testId, setTestId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (testId.trim() === '') {
      alert('Please enter Test\'s private ID!');
      return;
    }

    try {
      await getTestResponses({ 'quizPrivateID': testId });
      navigate(`/checkTestResponses/${testId}`)
    } catch (err) {
      alert('Answers with provided private ID have not been found!');
      setTestId('');
    }
  };

  return (
    <div>
      <h2>Check all Test's responses</h2><br />
      <input
        className="check-test-responses-input"
        type="text"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
        placeholder="Enter Test's private ID"
      /><br />
      <button className="check-test-responses-button" onClick={handleSubmit}>Check responses</button>
    </div>
  );
};

export default FindTestResponses;
