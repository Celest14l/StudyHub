import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'; // <-- FIX #1: Correct import
import modules from '../data/modules.json';
import useLocalStorage from '../hooks/useLocalStorage';
import { CheckCircle, Circle } from 'lucide-react';
import './CourseDetailPage.css';

function CourseDetailPage() {
  // --- FIX #2: All hooks are now at the top level ---
  const { moduleId } = useParams();
  const [completedLessons, setCompletedLessons] = useLocalStorage('completedLessons', {});
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Find the course right after getting the moduleId
  const course = modules.find(m => m.id === moduleId);

  // The useCallback hook is now called on every render, before any returns.
  const toggleLessonCompletion = useCallback((lessonId) => {
    setCompletedLessons(prev => {
      const courseCompletions = prev[moduleId] ? [...prev[moduleId]] : [];
      if (courseCompletions.includes(lessonId)) {
        // Mark incomplete
        return {
          ...prev,
          [moduleId]: courseCompletions.filter(id => id !== lessonId)
        };
      } else {
        // Mark complete
        return {
          ...prev,
          [moduleId]: [...courseCompletions, lessonId]
        };
      }
    });
  }, [moduleId, setCompletedLessons]);

  useEffect(() => {
    if (course && completedLessons[moduleId]) {
      const completedForThisCourse = completedLessons[moduleId];
      const firstIncompleteIndex = course.lessons.findIndex(
        lesson => !completedForThisCourse.includes(lesson.id)
      );
      if (firstIncompleteIndex !== -1) {
        setCurrentLessonIndex(firstIncompleteIndex);
      } else if (course.lessons.length > 0) {
        setCurrentLessonIndex(course.lessons.length - 1);
      }
    } else if (course && course.lessons.length > 0) {
      setCurrentLessonIndex(0);
    }
  }, [course, completedLessons, moduleId]);

  // --- Conditional rendering is now handled in the return statement ---

  // Handle "Course Not Found" case
  if (!course) {
    return (
      <div className="main-content">
        <h1>Course Not Found</h1>
        <p>The course you are looking for does not exist.</p>
      </div>
    );
  }

  // If the course is found, proceed with the main render
  const currentLesson = course.lessons[currentLessonIndex];

  const isLessonCompleted = (lessonId) => {
    return completedLessons[moduleId] && completedLessons[moduleId].includes(lessonId);
  };

  return (
    <div className="course-detail-page main-content">
      <h1>{course.title}</h1>
      <p className="course-description">{course.description}</p>

      <div className="course-content-grid">
        <div className="video-player-section">
          {currentLesson ? (
            <>
              <h2>{currentLesson.title}</h2>
              <div className="player-wrapper">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${currentLesson.youtubeId}`}
                  controls={true}
                  width="100%"
                  height="100%"
                  className="react-player"
                  onEnded={() => {
                    // Only mark as complete if not already completed
                    if (!isLessonCompleted(currentLesson.id)) {
                      toggleLessonCompletion(currentLesson.id);
                    }
                  }}
                />
              </div>
              <div className="lesson-actions">
                <button onClick={() => toggleLessonCompletion(currentLesson.id)}>
                  {isLessonCompleted(currentLesson.id) ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
              </div>
            </>
          ) : (
            <p>No lessons available for this course.</p>
          )}
        </div>

        <div className="lesson-list-section">
          <h2>Course Lessons</h2>
          <ul className="lesson-list">
            {course.lessons.map((lesson, index) => (
              <li
                key={lesson.id}
                className={`lesson-item ${index === currentLessonIndex ? 'active' : ''} ${isLessonCompleted(lesson.id) ? 'completed' : ''}`}
                onClick={() => setCurrentLessonIndex(index)}
              >
                <span className="lesson-status-icon">
                  {isLessonCompleted(lesson.id) ?
                    <CheckCircle size={18} color="var(--primary-green)" /> :
                    <Circle size={18} color="var(--border-color)" />
                  }
                </span>
                <span className="lesson-title">{lesson.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;