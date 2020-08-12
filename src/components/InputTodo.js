import React, { useState } from 'react'

const InputTodo = props => {
    const [inputText, setInputText] = useState({
        title: ""
    });

    const onChange = e => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addTodoProps(inputText.title);
        setInputText({
            title: ""
        });
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <input
            type="text"
            name="title"
            className="input-text"
            placeholder="Add todo..."
            value={inputText.title}
            onChange={onChange}
        />

        <input type="submit" className="input-submit" value="Submit" />
    </form>
}

export default InputTodo;
