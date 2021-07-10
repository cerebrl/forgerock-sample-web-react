/*
 * forgerock-sample-web-react
 *
 * home.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../state.js';

/**
 * @function Home - Home React view
 * @returns {Object} - React JSX view
 */
export default function Home() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   */
  const [state] = useContext(AppContext);
  const title = state.isAuthenticated ? 'Hello, again!' : 'Hello, visitor!';
  const message = state.isAuthenticated ? (
    <p>
      Welcome back! Manage <Link to="/todos">your todos here</Link>.
    </p>
  ) : (
    <Fragment>
      <p>
        Welcome to ForgeRock's sample app built with React (Web). The purpose of this is
        to demonstrate how the <a href="https://github.com/ForgeRock/forgerock-javascript-sdk">
        ForgeRock JavaScript SDK</a> is implemented within a fully functional application.
      </p>
      <p>
        <Link to="/login">Login</Link> to get things done! Don't have an account? Reach out to us,
        and we'll provide an account for you.
      </p>
    </Fragment>
  );

  return (
    <div className="container">
      <h1 className="mt-4 mb-3">
        {title}
      </h1>
      <div>
        { message }
      </div>
    </div>
  );
}
