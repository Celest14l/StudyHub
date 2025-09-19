import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css'; // Create this CSS file

function CourseCard({ course, progress }) {
  const completionPercentage = progress > 0 ? (progress / course.lessons.length) * 100 : 0;

  return (
    <div className="course-card card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${completionPercentage}%` }}></div>
      </div>
      <span className="progress-text">{Math.round(completionPercentage)}% Complete</span>
      <Link to={`/module/${course.id}`} className="view-course-button">
        View Course
      </Link>
    </div>
  );
}

export default CourseCard;