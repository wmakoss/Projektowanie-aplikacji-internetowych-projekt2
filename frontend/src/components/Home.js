import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <br /><h2>Welcome to QuizApp!</h2><br />
      <button className="home-button" onClick={() => navigate('/create')}>Create a new Test</button>
      <button className="home-button" onClick={() => navigate('/test')}>Take a Test</button>
      <button className="home-button" onClick={() => navigate('/checkTestResponses')}>Check all Test's responses</button>
      <button className="home-button" onClick={() => navigate('/checkAnswers')}>Check your answers</button>
    </div>
  );
};

export default Home;
