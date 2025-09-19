import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import StudyHubPage from './pages/StudyHubPage';
import TaskManagerPage from './pages/TaskManagerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css'; // Your global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CoursesPage />} />
            <Route path="/module/:moduleId" element={<CourseDetailPage />} />
            <Route path="/study-hub" element={<StudyHubPage />} />
            <Route path="/task-manager" element={<TaskManagerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;