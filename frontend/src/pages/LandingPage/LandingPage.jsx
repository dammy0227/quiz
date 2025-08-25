// src/pages/LandingPage/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-layout">
      <h1>Welcome to QuizApp</h1>
      <p>Choose your role to get started</p>

      <div className="landing-buttons">
        <button onClick={() => navigate('/register/student')}>Register as Student</button>
        <button onClick={() => navigate('/register/instructor')}>Register as Instructor</button>
      </div>

      <p>
        Already have an account? <span onClick={() => navigate('/login')} className="login-link">Login here</span>
      </p>
    </div>
  );
};

export default LandingPage;
