import React from 'react';
import { CheckCircle, Circle, Trash } from 'lucide-react';
import './TaskItem.css'; // Create this CSS file

function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        className="task-toggle-button"
        onClick={() => onToggleComplete(task.id)}
        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {task.completed ? <CheckCircle size={20} color="var(--primary-green)" /> : <Circle size={20} color="var(--border-color)" />}
      </button>
      <span className="task-text">{task.text}</span>
      <button
        className="task-delete-button"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <Trash size={18} color="var(--light-text-color)" />
      </button>
    </div>
  );
}

export default TaskItem;