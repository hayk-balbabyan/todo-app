import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import editIcon from '../icons/edit.svg';

const TodoItem = (props) => {
    const { id, index, title, handleTaskEdit } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
        setEditedTitle(title); // Reset the edited title to the original title
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const saveEditedTitle = () => {
        // Call the handleTaskEdit function to update the title
        handleTaskEdit(id, editedTitle);
        setIsEditing(false); // Turn off editing mode
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="todo-item"
                >
                    {isEditing ? (
                        <div className={'edit-task-wrapper'}>
                            <input type="text" value={editedTitle} onChange={handleTitleChange} />
                            <button onClick={saveEditedTitle}>Save</button>
                        </div>
                    ) : (
                        <div className={'task-title-wrapper'}>
                            <span>{title}</span>
                            <a onClick={toggleEditing}>
                                <img src={editIcon} alt="edit"/>
                            </a>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TodoItem;
