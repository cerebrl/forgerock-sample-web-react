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
  const [todos, setTodos] = useState([]);
  const [todoActionId, setTodoActionId] = useState('');
  const textInput = useRef(null);

  /**
   * Since we are making an API call, which is a side-effect,
   * we will wrap this in a useEffect, which will re-render the
   * view once the API request returns.
   */
  useEffect(function () {
    async function getTodos() {
      try {
        // Request the todos from our resource API
        const todos = await apiRequest('todos', 'GET');
        setTodos(todos);
      } catch (error) {
        console.log('Turn into redirect to login.');
      }
    }
    if (!todos.length) {
      getTodos();
    }
  }, []);

  async function createTodo(e) {
    e.preventDefault();
    const title = e.target.elements[0].value;
    const newTodo = await apiRequest('todos', 'POST', { title });
    setTodos([...todos, newTodo]);
    textInput.current.value = '';
    return;
  }

  async function deleteTodo() {
    await apiRequest(`todos/${todoActionId}`, 'DELETE');
    setTodos(todos.filter((todo) => todo.id !== todoActionId));
    return;
  }

  const Todos = !todos.length ? (
    <p className="d-flex justify-content-center align-items-center border-top px-3">
      <span className="spinner-border text-primary my-2" role="status"></span>
      <span className="p-3 fs-5">Collecting your todos ...</span>
    </p>
  ) : (
    <ul className="list-group list-group-flush mb-1">
      {todos.map(function (todo) {
        return <Todo key={todo.id} todo={todo} setTodoActionId={setTodoActionId} />;
      })}
    </ul>
  );

  return (
    <Fragment>
      <div className="container">
        <h1 className="mt-4">Your Todos</h1>
        <div className="card shadow-sm">
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
