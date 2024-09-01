import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import CreateTest from '../components/CreateTest';
import TakeTest from '../components/TakeTest';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTest />} />
      <Route path="/test" element={<TakeTest />} />
    </Routes>
  );
};

export default AppRouter;
