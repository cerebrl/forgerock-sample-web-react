/*
 * forgerock-sample-web-react
 *
 * router.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ProtectedRoute } from './utilities/route';
import Todos from './views/todos';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import Home from './views/home';
import Login from './views/login';
import Logout from './views/logout';
import Register from './views/register';

/**
 * @function App - Application React view
 * @returns {Object} - React JSX view
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute path="/todos">
          <Header />
          <Todos />
          <Footer />
        </ProtectedRoute>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Header />
          <Home />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
