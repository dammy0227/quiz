import React, { useState } from 'react';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';
import './StudentLayout.css';

const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="student-layout">
      {/* Navbar only shows hamburger on mobile */}
      <nav className="student-navbar">
        <button className="menu-btn" onClick={openSidebar}>☰</button>
        <h1 className="navbar-title">Quiz App</h1>
      </nav>

      {/* Sidebar */}
      <StudentSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main className="student-main">{children}</main>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default StudentLayout;
