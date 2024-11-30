import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  function handleChange(event) {
    const todoInput = event.target.value;
    setTodo(todoInput);
  }
  function handleClick(event) {
    event.preventDefault();
    setTodos((prev) => {
      return [...prev, todo];
    });
    setTodo("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} value={todo} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
