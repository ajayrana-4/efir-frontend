import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { connectDB } from './config/db';

// Try to connect to MongoDB
connectDB()
  .then(() => console.log('Attempted to connect to MongoDB'))
  .catch(err => console.log('Using mock data for frontend'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

