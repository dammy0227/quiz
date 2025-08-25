import React from 'react';
import './Navbar.css';

const Navbar = ({ links = [], onLogout }) => {
  return (
    <nav className="navbar">
      {/* <div className="navbar-brand">QuizApp</div> */}
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.path}>
            <a href={link.path}>{link.label}</a>
          </li>
        ))}
      </ul>
      {onLogout && (
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
