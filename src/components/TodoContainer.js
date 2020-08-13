import React, { useState, useEffect } from "react"
import axios from 'axios'

import InputTodo from "./InputTodo";
import Header from './Header'
import TodosList from "./TodosList"

const TodoContainer = props => {
    const [todos, setTodos] = useState([]);
    const [show, setShow] = useState(false);

    const handleChange = id => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        );

        setShow(!show);
    }

    const deleteTodo = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(() => setTodos([
                ...todos.filter(todo => todo.id !== id)
            ]));
    }

    const requestAddTodoItem = title => {
        axios.post("https://jsonplaceholder.typicode.com/todos", {
            title: title,
            completed: false
        }).then(response => setTodos(
            [...todos, response.data]
        ));
    }


    useEffect(() => {
        console.log("useEffect");
        axios.get("https://jsonplaceholder.typicode.com/todos", {
            params: {
                _limit: 10
            }
        }).then(response => setTodos(response.data));
    }, []);

    return (
        <div className="container">
            <Header headerSpan={show} />
            <InputTodo
                addTodoProps={requestAddTodoItem}
            />
            <TodosList
                todos={todos}
                handleChangeProps={handleChange}
                deleteTodoProps={deleteTodo}
            />
        </div>
    )
}

export default TodoContainer
