import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './TakeTest.css';

const TakeTest = () => {
  const [testId, setTestId] = useState('');
  // const navigate = useNavigate();

  const isNaturalNumber = () => {
    return /^\d+$/.test(testId);
  }

  const handleSubmit = () => {
    if (isNaturalNumber) {
      // TODO: backend
      // navigate(`/test/${testId}`);
      console.log(testId);
    } else {
      alert('Test ID must be a natural number.');
    }
  };

  return (
    <div>
      <h2>Take a Test</h2>
      <input
        className="take-test-input"
        type="text"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
        placeholder="Enter Test ID"
      />
      <button className="take-test-button" onClick={handleSubmit} disabled={!isNaturalNumber()}>Start Test</button>
    </div>
  );
};

export default TakeTest;
