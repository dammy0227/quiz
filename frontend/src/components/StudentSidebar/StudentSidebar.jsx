import React from 'react';
import { Link } from 'react-router-dom';
import './StudentSidebar.css';

const StudentSidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`student-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="cancel-icon" onClick={onClose}>✖</button>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/student/dashboard" onClick={onClose}>Dashboard</Link></li>
        <li><Link to="/student/results" onClick={onClose}>Results</Link></li>
        <li><Link to="/login" onClick={onClose}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
