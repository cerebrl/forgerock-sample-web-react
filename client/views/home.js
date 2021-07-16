/*
 * forgerock-sample-web-react
 *
 * home.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../state.js';
import VerifiedIcon from '../components/icons/verified-icon.js';

/**
 * @function Home - Home React view
 * @returns {Object} - React JSX view
 */
export default function Home() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [state] = useContext(AppContext);
  const LoginAlert = () => {
    return state.isAuthenticated ? (
      <p
        className="verified_alert alert alert-success d-flex align-items-center mt-5"
        role="alert"
      >
        <VerifiedIcon classes="verified-alert_icon" size="36px" />
        <span className="ps-2">
          Welcome back, {state.username}!{' '}
          <Link className="verified-alert_link" to="/todos">
            Manage your todos here
          </Link>
          .
        </span>
      </p>
    ) : null;
  };

  return (
    <div className="container">
      {LoginAlert()}
      <h1 className="home_head-text text-center">
        Protect with ForgeRock; Develop with React.js
      </h1>

      <p className=".home_subhead-text fs-3 mb-4 fw-bold text-muted">
        Learn how to develop ForgeRock protected, web apps with the{' '}
        <a
          className="text-muted text-decoration-underline"
          href="https://reactjs.org/"
        >
          React.js
        </a>{' '}
        library and our{' '}
        <a
          className="text-muted text-decoration-underline"
          href="https://github.com/ForgeRock/forgerock-javascript-sdk"
        >
          JavaScript SDK
        </a>
        .
      </p>
      <p>
        The purpose of this sample web app is to demonstrate how the ForgeRock
        JavaScript SDK is implemented within a fully-functional application
        using a popular framework.
      </p>
      <p>
        To use this app, <Link to="/register">create an account now</Link>!
        Already have an account? <Link to="/login">Login</Link> to get things
        done!
      </p>
    </div>
  );
}
