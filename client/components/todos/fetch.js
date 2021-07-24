/*
 * forgerock-sample-web-react
 *
 * fetch.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import apiRequest from '../../utilities/request';

export default function useTodoFetch(dispatch, setFetched, todos) {
  const history = useHistory();

  /**
   * Since we are making an API call, which is a side-effect,
   * we will wrap this in a useEffect, which will re-render the
   * view once the API request returns.
   */
  useEffect(() => {
    async function getTodos() {
      // Request the todos from our resource API
      const fetchedTodos = await apiRequest('todos', 'GET');

      // TODO: improve error handling
      if (todos.error) {
        return history.push('/login');
      }
      setFetched(true);
      dispatch({ type: 'init-todos', payload: { todos: fetchedTodos } });
    }
    if (!todos.length) {
      getTodos();
    }
  }, [dispatch, history, setFetched, todos]);
}
