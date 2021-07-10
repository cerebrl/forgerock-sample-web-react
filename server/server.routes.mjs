/*
 * forgerock-sample-web-react
 *
 * server.routes.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { v4 as uuid } from 'uuid';
import { auth } from './server.middleware.mjs';

let todos = [
  {
    title: 'My first todo',
    completed: false,
    id: 'b557318e-19ff-458d-8a4e-114d8c89a723',
  },
];

/**
 * @function routes - Initializes the routes
 * @param app {Object} - Express application
 * @return {void}
 */
export default async function routes(app) {
  /**
   * Protected route for todos.
   * The auth middleware checks for valid user auth.
   */
  app.get('/todos', auth, async (req, res) => {
    res.json(todos);
  });

  app.post('/todos', auth, async (req, res) => {
    const newTodo = {
      ...req.body,
      completed: false,
      id: uuid(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.post('/todos/:id', auth, async (req, res) => {
    const todo = todos.find((todo) => todo.id === req.params.id);
    todo.completed = !todo.completed;
    res.json(todo);
  });

  app.delete('/todos/:id', auth, async (req, res) => {
    todos = todos.filter((todo) => todo.id !== req.params.id);
    res.status(204).send('OK');
  });
}
