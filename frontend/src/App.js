import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          <AppRouter />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
