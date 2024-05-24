import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    const todo = document.getElementById('todoAdd').value.trim();
    if (todo.length > 0) {
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    } else {
      alert("Enter a valid task");
    }
    document.getElementById('todoAdd').value = "";
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedText = document.getElementById(id).value.trim();
    if (updatedText.length > 0) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.text = updatedText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    } else {
      alert("Enter a valid task");
    }
  }

  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input type="text" id={todo.id} defaultValue={todo.text} />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
