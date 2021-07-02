/*
 * forgerock-sample-web-react
 *
 * header.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { AppContext } from '../state.js';

/**
 * @function Header - Header React view
 * @returns {Object} - React JSX view
 */
export default function Header() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   */
  const [state] = useContext(AppContext);
  let TodosItem;
  let LoginOrOutItem;

  /**
   * Render different navigational items depending on authenticated status
   */
  switch (state.authenticated) {
    case true:
      TodosItem = (
        <li className="nav-item">
          <a
            className={`nav-link ${state.page === 'todos' ? 'active' : ''}`}
            href="/todos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>
            <span className="px-2">
              Todos
            </span>
          </a>
        </li>
      );
      LoginOrOutItem = (
        <div className="d-flex">
          <a className="btn btn-outline-primary" href="/logout">
            Logout
          </a>
        </div>
      );
      break;
    default:
      TodosItem = null;
      LoginOrOutItem = (
        <div className="d-flex">
          <a className="btn btn-outline-primary" href="/login">
            Login
          </a>
        </div>
      );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
      <div className="container">
        <a
          className="navbar-brand border-end pe-4"
          href="/"
        >
          React
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {TodosItem}
          </ul>
          {LoginOrOutItem}
        </div>
      </div>
    </nav>
  );
}
