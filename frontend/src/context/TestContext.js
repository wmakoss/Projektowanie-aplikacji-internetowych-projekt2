import React, { createContext, useState } from 'react';

const TestContext = createContext();

const TestProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentTestId, setCurrentTestId] = useState(null);

  const addQuestion = (question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const setAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const clearTest = () => {
    setQuestions([]);
    setAnswers({});
    setCurrentTestId(null);
  };

  const setTestId = (testId) => {
    setCurrentTestId(testId);
  };

  return (
    <TestContext.Provider
      value={{
        questions,
        addQuestion,
        answers,
        setAnswer,
        currentTestId,
        setTestId,
        clearTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export { TestContext, TestProvider };
