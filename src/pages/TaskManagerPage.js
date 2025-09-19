import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TaskItem from '../components/TaskItem';
import useLocalStorage from '../hooks/useLocalStorage';
import './TaskManagerPage.css'; // Create this CSS file

function TaskManagerPage() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
  const [tasks, setTasks] = useLocalStorage(`tasks-${today}`, []);
  const [newTaskText, setNewTaskText] = useState('');

  // Effect to clear tasks or load tasks for a new day if the date changes
  useEffect(() => {
    // This effectively 'resets' or loads tasks for the current day
    // The useLocalStorage hook already handles loading for `tasks-${today}`
    // If the date changes, `tasks-${today}` will point to a new key,
    // and the state will initialize to an empty array (or previous tasks for that day if they exist).
    // No explicit clear is needed here, as the key dynamically updates.
  }, [today]); // Rerun when 'today' changes (i.e., new day)

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Date.now(), // Unique ID
      text: newTaskText.trim(),
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-manager-page main-content">
      <div className="task-manager-card card">
        <h1>Daily Task Manager</h1>
        <p className="subtitle">Tasks for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <form onSubmit={handleAddTask} className="add-task-form">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            aria-label="New task"
          />
          <button type="submit" aria-label="Add task">
            <Plus size={20} /> Add Task
          </button>
        </form>

        <div className="task-list-container">
          {tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id}>
                  <TaskItem
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks-message">No tasks for today. Start adding some!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagerPage;