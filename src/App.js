import React, { useState } from 'react';
import './App.scss';
import ToDoColumn from './components/ToDoColumn';
import TaskForm from './components/TaskForm';
import { DragDropContext } from 'react-beautiful-dnd';
import todoIcon from './icons/todo.svg';
import inProgressIcon from './icons/in-progress.svg';
import inReviewIcon from './icons/in-review.svg';
import completedIcon from './icons/completed.svg';

function App() {

    const columns = [
        {title: "ToDo", status: 'todo', icon: <img src={todoIcon} alt="ToDo" />},
        {title: "In Progress", status: 'in-progress', icon: <img src={inProgressIcon} alt="InProgress" />},
        {title: "In Review", status: 'in-review', icon: <img src={inReviewIcon} alt="InReview" />},
        {title: "Completed", status: 'completed', icon: <img src={completedIcon} alt="Completed" />},
    ];

    const [tasks, setTasks] = useState([
        { id: 'task1', content: 'Task 1', status: 'todo' },
        { id: 'task2', content: 'Task 2', status: 'todo' },
        { id: 'task3', content: 'Task 3', status: 'in-progress' },
    ]);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    const handleAddTask = (taskTitle) => {
        const task = { id: `task${tasks.length + 1}`, content: taskTitle, status: 'todo'};
        setTasks([...tasks, task]);
        setShowAddTaskForm(false);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];

        const movedTask = updatedTasks.find(task => task.id === result.draggableId);
        if (!movedTask) return;

        const sourceIndex = updatedTasks.findIndex(task => task.id === result.draggableId);
        updatedTasks.splice(sourceIndex, 1);

        const destinationIndex = result.destination.index;
        updatedTasks.splice(destinationIndex, 0, movedTask);

        if (result.source.droppableId !== result.destination.droppableId) {
            movedTask.status = result.destination.droppableId;
        }

        setTasks(updatedTasks);
    };

    const handleTaskEdit = (taskId, newTitle) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, content: newTitle };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="App">
                <div className="header-container">
                    <h1>Task Management</h1>
                    <div className="add-task-button">
                        <button onClick={() => setShowAddTaskForm(true)}>Add Task</button>
                    </div>
                </div>
                {showAddTaskForm && (
                    <div className="add-task-form">
                        <TaskForm onAddTask={handleAddTask} onCancel={() => setShowAddTaskForm(false)} />
                    </div>
                )}
                <div className="columns-grid">
                    {
                        columns.map(col => {
                            return (
                                <ToDoColumn tasks={tasks.filter(task => task.status === col.status)} icon={col.icon}
                                            title={col.title} droppableId={col.status} key={col.status} handleTaskEdit={handleTaskEdit}/>
                            )
                        })
                    }
                </div>
            </div>
        </DragDropContext>
    );
}

export default App;
