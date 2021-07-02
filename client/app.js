/*
 * forgerock-sample-web-react
 *
 * app.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';

import Todos from './views/todos.js';
import Header from "./components/header.js";
import Home from './views/home.js';
import Login from './views/login.js';
import Footer from "./components/footer.js";
import { AppContext } from './state.js';

/**
 * @function App - Application React view
 * @returns {Object} - React JSX view
 */
export default function App() {
  const [state] = useContext(AppContext);
  let Main;

  switch (state.page) {
    case 'home':
      Main = Home;
      break;
    case 'todos':
      Main = Todos;
      break;
    case 'login':
      Main = Login;
      break;
    default:
      Main = Home;
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Main />
      </div>
      <Footer />
    </Fragment>
  );
}
