import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE = process.env.REACT_APP_API_BASE;
function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  const removeTodo = async (todo: any) => {
    const response = await axios
      .get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  const deleteTodo = async (todo: any) => {
    const response = await axios.delete(`${API}/${todo.id}`);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const updateTodo = async () => {
    const response = await axios.put(`${API}/${todo.id}`, todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };






  useEffect(() => {
    fetchTodos();
  }, []);


  const API = `${API_BASE}/a5/todos`;

  // Function to update todo description on the server
  const updateDescription = () => {
    const url = `${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`;
    window.open(url, "_blank");
  };

  // Function to update todo completed status on the server
  const updateCompleted = () => {
    const url = `${API}/${todo.id}/completed/${todo.completed}`;
    window.open(url, "_blank");
  };


  return (
    <div className="container mt-5">
      <h2>Working with Arrays</h2>
      <input className="form-control my-2" value={todo.id} readOnly />
      <input className="form-control my-2" onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        value={todo.title} type="text" />
      {/* Input for editing description */}
      <textarea className="form-control my-2" value={todo.description}
        onChange={(e) => setTodo({
          ...todo,
          description: e.target.value
        })} />
      <input value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value
        })} />
      <label>
        <input checked={todo.completed} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked
          })} />
        Completed
      </label>
      <button onClick={postTodo}> Post Todo </button>
      <button onClick={updateTodo}>
        Update Todo
      </button>
      <div className="mb-3">
        <button onClick={createTodo} className="btn btn-warning">Create Todo</button>
        <button onClick={updateTitle} className="btn btn-primary ml-2">Update Title</button>
      </div>
      {/* Todos List */}
      <ul className="list-group mb-3">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <input checked={todo.completed}
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <div>
              <button onClick={() => fetchTodoById(todo.id)} className="btn btn-info mr-2">Edit</button>
              <button onClick={() => deleteTodo(todo)}
                className="btn btn-danger float-end ms-2">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>


      <h3>Updating an Item in an Array</h3>
      <a className="btn btn-primary my-2" href={`${API}/${todo.id}/title/${todo.title}`} role="button">
        Update Title to {todo.title}
      </a>

      <h4>Retrieving Arrays</h4>
      <a className="btn btn-secondary my-2" href={API} role="button">
        Get Todos
      </a>

      <h4>Retrieving an Item from an Array by ID</h4>
      <a className="btn btn-info my-2" href={`${API}/${todo.id}`} role="button">
        Get Todo by ID
      </a>

      <h3>Filtering Array Items</h3>
      <a className="btn btn-success my-2" href={`${API}?completed=true`} role="button">
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-warning my-2" href={`${API}/create`} role="button">
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a className="btn btn-danger my-2" href={`${API}/${todo.id}/delete`} role="button">
        Delete Todo with ID = {todo.id}
      </a>



      {/* Link to update description */}
      <button className="btn btn-primary my-2" onClick={updateDescription}>
        Update Description
      </button>

      {/* Checkbox for editing completed status */}
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={todo.completed}
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked
          })} />
        <label className="form-check-label">
          Completed
        </label>
      </div>
      {/* Link to update completed status */}
      <button className="btn btn-success my-2" onClick={updateCompleted}>
        Update Completed Status
      </button>Í
    </div>
  );
}
export default WorkingWithArrays;
