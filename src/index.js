import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
