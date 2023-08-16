import React, { useState } from 'react';

const TaskForm = ({ onAddTask, onCancel }) => {
    const [taskTitle, setTaskTitle] = useState('');

    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleAddTask = () => {
        if (taskTitle.trim() !== '') {
            onAddTask(taskTitle);
            setTaskTitle('');
        }
    };

    return (
        <div className="task-form">
            <h3>Add New Task</h3>
            <div>
                <input
                    type="text"
                    value={taskTitle}
                    className={'task-form--task-title'}
                    onChange={handleTaskTitleChange}
                    placeholder="Task title"
                />
            </div>
            <div className="task-form--actions">
                <button onClick={handleAddTask}>Add</button>
                <button onClick={onCancel} className={'danger'}>Cancel</button>
            </div>
        </div>
    );
};

export default TaskForm;
