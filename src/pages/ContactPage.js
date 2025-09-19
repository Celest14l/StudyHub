import React from 'react';
import './StaticPage.css'; // Use the shared CSS for static pages

function ContactPage() {
  return (
    <div className="static-page main-content">
      <div className="static-card card">
        <h1>Contact Us</h1>
        <p>Have questions, feedback, or need support? We'd love to hear from you!</p>
        <p>You can reach us through the following channels:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:support@learnhub.com">support@learnhub.com</a></li>
          <li><strong>Phone:</strong> +1 (555) 123-4567</li>
          <li><strong>Address:</strong> 123 Learning Lane, Knowledge City, LC 98765</li>
        </ul>
        <p>We aim to respond to all inquiries within 24-48 business hours.</p>
      </div>
    </div>
  );
}

export default ContactPage;