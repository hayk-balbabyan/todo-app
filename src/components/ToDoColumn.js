import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from "./TodoItem";

const ToDoColumn = ({ tasks, title, droppableId, icon, handleTaskEdit }) => {
    return (
        <div className="column">
            <div className="column-header-container">
                <p>{title}</p>
                {icon}
            </div>

            <Droppable droppableId={droppableId} type="TASK">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => {
                            return (
                                <TodoItem id={`${task.id}`} key={`${droppableId}-${task.id}`}
                                          index={index} title={task.content} handleTaskEdit={handleTaskEdit}/>
                            );
                        })}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default ToDoColumn;
