import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h2>Welcome to QuizApp!</h2>
      <ul>
        <li className="home-link">
          <Link to="/create">Create a new test</Link>
        </li>
        <li className="home-link">
          <Link to="/test">Take a test</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
