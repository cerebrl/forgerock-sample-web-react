/*
 * forgerock-sample-web-react
 *
 * todo.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useState } from 'react';

import ActionIcon from './icons/action-icon';
import apiRequest from '../utilities/request';
import TodoIcon from './icons/todo-icon';

/**
 * @function Todo - Used for display a single todo and its details
 * @param {Object} props - The object representing React's props
 * @param {Object} props.todo - The todo object passed from the parent component
 * @returns {Object} - React JSX view
 */
export default function Todo({ setTodoActionId, todo: item }) {
  const [todo, updateTodo] = useState(item);
  const todoClass = `todo_label ${
    todo.completed ? 'todo_label_complete' : 'todo_label_incomplete'
  } ${'col d-flex align-items-center fs-5 w-100 ms-2 p-3'}`;

  async function toggleTodo(id) {
    await apiRequest(`todos/${id}`, 'POST');
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
    return;
  }

  return (
    <li className="todo_item list-group-item list-group-item-action p-0">
      <div className="row">
        <label htmlFor={todo.id} className={todoClass}>
          <input
            id={todo.id}
            className="form-check-input visually-hidden"
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => {
              e.preventDefault();
              toggleTodo(todo.id);
            }}
          />
          <TodoIcon completed={todo.completed} />
          {todo.title}
        </label>
        <div className="dropdown col-2 text-end" aria-expanded="false">
          <button
            className="todo_dropdown_actions btn h-100"
            data-bs-toggle="dropdown"
            id={`todo_action_${todo.id}`}
          >
            <ActionIcon />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby={`todo_action_${todo.id}`}
          >
            {/* <li><a className="dropdown-item" href="todo.id/edit">Edit</a></li> */}
            <li>
              <button
                className="dropdown-item"
                onClick={(e) => setTodoActionId(todo.id)}
                data-bs-toggle="modal"
                data-bs-target="#todoModal"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
