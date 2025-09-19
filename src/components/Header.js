import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css'; // Create this CSS file

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">LearnHub</Link>
        <nav className="main-nav">
          <NavLink to="/" end>Courses</NavLink>
          <NavLink to="/study-hub">Study Hub</NavLink>
          <NavLink to="/task-manager">Task Manager</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;