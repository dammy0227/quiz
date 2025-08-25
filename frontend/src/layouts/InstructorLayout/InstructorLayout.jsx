import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './InstructorLayout.css';

const InstructorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="instructor-layout">
      {/* Navbar only shows hamburger on mobile */}
      <nav className="instructor-navbar">
        <button className="menu-btn" onClick={openSidebar}>☰</button>
        <h1 className="navbar-title">Quiz App</h1>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main className="instructor-main">
        {children}
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default InstructorLayout;
