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
import TodoIcon from './icons/todo-icons';
import apiRequest from '../utilities/request';

/**
 * @function Todo - Used for display a single todo and its details
 * @param {Object} props - The object representing React's props
 * @param {Object} props.todo - The todo object passed from the parent component
 * @returns {Object} - React JSX view
 */
export default function Todo({ todo: item }) {
  const [todo, updateTodo] = useState(item);
  const todoClass = `${todo.completed ? 'todo_label_complete' : ''} ${'fs-5 w-100 p-3'}`;

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
      <label
        htmlFor={todo.id}
        className={todoClass}
      >
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
    </li>
  );
}
