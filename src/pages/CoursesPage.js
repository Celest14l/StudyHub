import React from 'react';
import CourseCard from '../components/CourseCard';
import modules from '../data/modules.json';
import useLocalStorage from '../hooks/useLocalStorage';
import './CoursesPage.css'; // Create this CSS file

function CoursesPage() {
  // { 'react-basics': ['rb-1', 'rb-2'], 'js-essentials': ['js-1'] }
  const [completedLessons] = useLocalStorage('completedLessons', {});

  const getCourseProgress = (courseId) => {
    return completedLessons[courseId] ? completedLessons[courseId].length : 0;
  };

  return (
    <div className="courses-page main-content">
      <h1>Welcome to LearnHub!</h1>
      <p className="subtitle">Embark on your learning journey with our curated courses.</p>
      <div className="course-grid">
        {modules.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            progress={getCourseProgress(course.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;