/*
 * forgerock-sample-web-react
 *
 * app.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import { AppContext } from './state.js';
import Todos from './views/todos.js';
import Header from './components/header.js';
import Home from './views/home.js';
import Login from './views/login.js';
import Logout from './views/logout.js';

/**
 * @function App - Application React view
 * @returns {Object} - React JSX view
 */
export default function App() {
  const [{ isAuthenticated }] = useContext(AppContext);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/todos">
          {isAuthenticated ? <Todos /> : <Redirect to="/login" />}
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
