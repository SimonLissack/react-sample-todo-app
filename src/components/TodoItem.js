import React, { useEffect } from 'react'

const TodoItem = props => {
    useEffect(() => {
        return () => {
            console.log("item about to be deleted");
        }
    }, [])

    const { completed, id, title } = props.todo;

    const completedStyle = {
        fontStyle: "italic",
        color: "#d35e0f",
        opacity: 0.4,
        textDecoration: "line-through",
    };

    return <li className="todo-item">
        <input
            type="checkbox"
            checked={completed}
            onChange={() => props.handleChangeProps(id)}
        />
        <span style={completed ? completedStyle : null}>
            {title}
        </span>
        <button onClick={() => props.deleteTodoProps(id)}>
            Delete
        </button>
    </li>

};

export default TodoItem
