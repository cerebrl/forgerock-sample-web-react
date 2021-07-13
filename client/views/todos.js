/*
 * forgerock-sample-web-react
 *
 * todos.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../components/modal.js';
import Todo from '../components/todo.js';
import apiRequest from '../utilities/request.js';

/**
 * @function Todos - React view component for retrieving and displaying todos
 * @returns {Object} - React JSX view
 */
export default function Todos() {
  /**
   * Use local, component state for todos. Though, this could be moved to
   * the global state if that's preferred over doing API calls in React views
   */
  let [hasFetched, setFetched] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoActionId, setTodoActionId] = useState('');
  const textInput = useRef(null);
  const history = useHistory();

  /**
   * Since we are making an API call, which is a side-effect,
   * we will wrap this in a useEffect, which will re-render the
   * view once the API request returns.
   */
  useEffect(function () {
    async function getTodos() {
      // Request the todos from our resource API
      const todos = await apiRequest('todos', 'GET');
      if (todos.error) {
        return history.push('/login');
      }
      setFetched(true);
      setTodos(todos);
    }
    if (!todos.length) {
      getTodos();
    }
  }, []);

  async function createTodo(e) {
    e.preventDefault();
    const title = e.target.elements[0].value;
    const newTodo = await apiRequest('todos', 'POST', { title });
    setTodos([newTodo, ...todos]);
    textInput.current.value = '';
    return;
  }

  async function deleteTodo() {
    await apiRequest(`todos/${todoActionId}`, 'DELETE');
    setTodos(todos.filter((todo) => todo._id !== todoActionId));
    return;
  }

  const Todos = hasFetched ? (
    <ul className="list-group list-group-flush mb-1">
      {todos.length > 0 ? (
        todos.map(function (todo) {
          return (
            <Todo
              key={todo._id}
              todo={todo}
              setTodoActionId={setTodoActionId}
            />
          );
        })
      ) : (
        <li className="todo_item list-group-item list-group-item-action p-0">
          <div className="row">
            <p className="col d-flex align-items-center fs-5 text-muted w-100 ms-3 p-3">
              No todos yet. Create one above!
            </p>
          </div>
        </li>
      )}
    </ul>
  ) : (
    <p className="d-flex justify-content-center align-items-center border-top px-3">
      <span className="spinner-border text-primary my-2" role="status"></span>
      <span className="p-3 fs-5">Collecting your todos ...</span>
    </p>
  );

  return (
    <Fragment>
      <div className="container">
        <h1 className="mt-5">Your Todos</h1>
        <p className="fs-6 text-muted">Create and manage your todos.</p>
        <div className="card shadow-sm mb-5">
          <form
            className="p-3"
            action="https://api.example.com:8443/todos"
            method="POST"
            onSubmit={createTodo}
          >
            <div className="form-floating todos_input">
              <input
                id="newTodo"
                type="text"
                className="form-control"
                placeholder="What needs doing?"
                ref={textInput}
              />
              <label htmlFor="newTodo">What needs doing?</label>
            </div>
          </form>
          {Todos}
        </div>
      </div>
      <Modal deleteTodo={deleteTodo} />
    </Fragment>
  );
}
