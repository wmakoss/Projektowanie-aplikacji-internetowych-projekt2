import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateTest from './components/CreateTest';
import TestCreated from './components/TestCreated';
import FindTest from './components/FindTest';
import TakeTest from './components/TakeTest';
import TestTaken from './components/TestTaken';
import FindAnswers from './components/FindAnswers';
import CheckAnswers from './components/CheckAnswers';
import FindTestResponses from './components/FindTestResponses';
import CheckTestResponses from './components/CheckTestResponses';
import './App.css';

function App() {
  return (
    <Router>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTest />} />
            <Route path="/createdTest" element={<TestCreated />} />
            <Route path="/test" element={<FindTest />} />
            <Route path="/test/:id" element={<TakeTest />} />
            <Route path="/testTaken" element={<TestTaken />} />
            <Route path="/checkAnswers" element={<FindAnswers />} />
            <Route path="/checkAnswers/:id" element={<CheckAnswers />} />
            <Route path="/checkTestResponses" element={<FindTestResponses />} />
            <Route path="/checkTestResponses/:id" element={<CheckTestResponses />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
