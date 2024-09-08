import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import CreateTest from '../components/CreateTest';
import FindTest from '../components/FindTest';
import TakeTest from '../components/TakeTest';
import FindAnswers from '../components/FindAnswers';
import CheckAnswers from '../components/CheckAnswers';
import FindTestResponses from '../components/FindTestResponses';
import CheckTestResponses from '../components/CheckTestResponses';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTest />} />
      <Route path="/test" element={<FindTest />} />
      <Route path="/test/:id" element={<TakeTest />} />
      <Route path="/checkAnswers" element={<FindAnswers />} />
      <Route path="/checkAnswers/:id" element={<CheckAnswers />} />
      <Route path="/checkTestResponses" element={<FindTestResponses />} />
      <Route path="/checkTestResponses/:id" element={<CheckTestResponses />} />
    </Routes>
  );
};

export default AppRouter;
