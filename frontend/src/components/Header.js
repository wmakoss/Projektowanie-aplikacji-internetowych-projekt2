import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <a href="/" className="logol">
        <img src="./no-copyright-quizapp-logo.png" alt="QuizApp Logo" className="logo" />
      </a>
      <h1>
        <a href="/">QuizApp</a>
      </h1>
    </header>
  );
};

export default Header;
