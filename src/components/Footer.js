import React from 'react';
import './Footer.css'; // Create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;