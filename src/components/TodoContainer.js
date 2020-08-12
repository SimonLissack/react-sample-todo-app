import React from "react"
import axios from 'axios'

import InputTodo from "./InputTodo";
import Header from './Header'
import TodosList from "./TodosList"

class TodoContainer extends React.Component {
    state = {
        todos: []
    }

    handleChange = id => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    }

    deleteTodo = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(() => this.setState({
                todos: [
                    ...this.state.todos.filter(todo => todo.id !== id)
                ]
            }));
    }

    requestAddTodoItem = title => {
        axios.post("https://jsonplaceholder.typicode.com/todos", {
            title: title,
            completed: false
        }).then(response => this.setState({
            todos: [...this.state.todos, response.data]
        }));
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/todos", {
            params: {
                _limit: 10
            }
        }).then(response => this.setState({ todos: response.data }));
    }

    render() {
        return (
            <div className="container">
                <Header />
                <InputTodo
                    addTodoProps={this.requestAddTodoItem}
                />
                <TodosList
                    todos={this.state.todos}
                    handleChangeProps={this.handleChange}
                    deleteTodoProps={this.deleteTodo}
                />
            </div>
        )
    }
}

export default TodoContainer
