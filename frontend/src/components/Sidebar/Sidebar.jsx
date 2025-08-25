import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="cancel-icon" onClick={onClose}>✖</button>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/instructor/dashboard" onClick={onClose}>Dashboard</Link></li>
        <li><Link to="/instructor/create-quiz" onClick={onClose}>Create Quiz</Link></li>
        <li><Link to="/instructor/manage-quizzes" onClick={onClose}>Manage Quizzes</Link></li>
        <li><Link to="/login" onClick={onClose}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
