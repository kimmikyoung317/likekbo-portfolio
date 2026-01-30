import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // src/App.js를 가져옴
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);