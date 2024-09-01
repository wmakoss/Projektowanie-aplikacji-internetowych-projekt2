import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestProvider } from './context/TestContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TestProvider>
      <App />
    </TestProvider>
  </React.StrictMode>
);
