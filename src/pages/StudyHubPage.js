import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, X, Sun, Moon } from 'lucide-react';
import './StudyHubPage.css'; // Create this CSS file

const DEFAULT_STUDY_TIME = 25 * 60; // 25 minutes
const DEFAULT_BREAK_TIME = 5 * 60;  // 5 minutes

function StudyHubPage() {
  const [studyTime, setStudyTime] = useState(DEFAULT_STUDY_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [timeLeft, setTimeLeft] = useState(studyTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isStudySession, setIsStudySession] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [studyInput, setStudyInput] = useState(studyTime / 60);
  const [breakInput, setBreakInput] = useState(breakTime / 60);
  const [isStudyMode, setIsStudyMode] = useState(false); // Distraction-free mode

  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = useCallback(() => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          // Trigger notification
          if (Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
              body: isStudySession ? 'Study session ended! Time for a break.' : 'Break ended! Time to study.',
              icon: 'https://cdn-icons-png.flaticon.com/512/2924/2924976.png' // A generic icon for notifications
            });
          }
          setIsStudySession(prev => !prev);
          return isStudySession ? breakTime : studyTime; // Switch session and reset time
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [isStudySession, breakTime, studyTime]);


  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  }, []);


  const resetTimer = useCallback(() => {
    pauseTimer();
    setIsStudySession(true);
    setTimeLeft(studyTime);
  }, [pauseTimer, studyTime]);


  useEffect(() => {
    // Request notification permission on component mount
    if (!Notification.permission || Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    // Update timeLeft when studyTime or breakTime changes, or when session switches
    setTimeLeft(isStudySession ? studyTime : breakTime);
    // If timer is running and session type switches, immediately restart with new time
    if (isRunning) {
        pauseTimer(); // Pause current interval
        startTimer(); // Start new interval with updated time
    }
  }, [isStudySession, studyTime, breakTime, isRunning, pauseTimer, startTimer]);


  useEffect(() => {
    return () => clearInterval(timerRef.current); // Cleanup timer on component unmount
  }, []);

  const applySettings = () => {
    const newStudyTime = parseInt(studyInput) * 60;
    const newBreakTime = parseInt(breakInput) * 60;

    if (isNaN(newStudyTime) || newStudyTime <= 0 || isNaN(newBreakTime) || newBreakTime <= 0) {
      alert("Please enter valid positive numbers for times.");
      return;
    }

    setStudyTime(newStudyTime);
    setBreakTime(newBreakTime);
    setTimeLeft(newStudyTime); // Reset to new study time
    setIsStudySession(true); // Always start with study session after settings change
    setIsRunning(false); // Stop timer
    clearInterval(timerRef.current); // Clear any running timer
    setShowSettings(false);
  };

  return (
    <div className={`study-hub-page main-content ${isStudyMode ? 'study-mode-active' : ''}`}>
      <div className="study-hub-card card">
        <h1>Study Hub</h1>
        <p className="subtitle">Boost your productivity with the Pomodoro Technique.</p>

        <div className="pomodoro-timer">
          <div className="timer-display">
            <div className="timer-label">{isStudySession ? 'Study Time' : 'Break Time'}</div>
            <div className="time-left">{formatTime(timeLeft)}</div>
          </div>
          <div className="timer-controls">
            <button onClick={isRunning ? pauseTimer : startTimer}>
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer}>
              <RotateCcw size={24} /> Reset
            </button>
            <button onClick={() => setShowSettings(true)}>
              <Settings size={24} /> Settings
            </button>
          </div>

          <div className="study-mode-toggle">
            <button
              onClick={() => setIsStudyMode(prev => !prev)}
              className={`toggle-button ${isStudyMode ? 'active' : ''}`}
            >
              {isStudyMode ? <Moon size={20} /> : <Sun size={20} />}
              {isStudyMode ? 'Exit Study Mode' : 'Enter Study Mode'}
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="settings-modal-overlay">
            <div className="settings-modal card">
              <h2>Timer Settings</h2>
              <div className="setting-item">
                <label htmlFor="study-time">Study Time (minutes):</label>
                <input
                  id="study-time"
                  type="number"
                  value={studyInput}
                  onChange={(e) => setStudyInput(e.target.value)}
                  min="1"
                />
              </div>
              <div className="setting-item">
                <label htmlFor="break-time">Break Time (minutes):</label>
                <input
                  id="break-time"
                  type="number"
                  value={breakInput}
                  onChange={(e) => setBreakInput(e.target.value)}
                  min="1"
                />
              </div>
              <div className="settings-actions">
                <button onClick={applySettings}>Apply</button>
                <button className="cancel-button" onClick={() => setShowSettings(false)}>
                  <X size={20} /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudyHubPage;