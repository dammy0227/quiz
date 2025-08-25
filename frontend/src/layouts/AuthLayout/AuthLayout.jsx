import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-title">QuizApp</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
