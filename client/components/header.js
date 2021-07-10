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
import { Link } from 'react-router-dom';

import AccountIcon from './icons/account-icon';
import { AppContext } from '../state.js';
import TodosIcon from './icons/todos-icon';

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
  switch (state.isAuthenticated) {
    case true:
      TodosItem = (
        <li className="nav-item">
          <Link
            className={`nav-link ${state.page === 'todos' ? 'active' : ''}`}
            to="/todos"
          >
            <TodosIcon />
            <span className="px-2">
              Todos
            </span>
          </Link>
        </li>
      );
      LoginOrOutItem = (
        <div className="d-flex">
          <div className="dropdown text-end">
            <button
              aria-expanded="false"
              className="account_dropdown-btn btn h-100 p-0"
              data-bs-toggle="dropdown"
              data-bs-offset="[20,20]"
              id="account_dropdown"
            >
              <AccountIcon />
            </button>
            <ul className="account_dropdown-menu dropdown-menu dropdown-menu-end" aria-labelledby="account_dropdown">
              <li>
                <div className="dropdown-header border-bottom">
                  <p className="fw-bold mb-0">{ state.username }</p>
                  <p className="mb-2">{ state.email }</p>
                </div>
              </li>
              <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
            </ul>
          </div>
        </div>
      );
      break;
    default:
      TodosItem = null;
      LoginOrOutItem = (
        <div className="d-flex">
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
        </div>
      );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
      <div className="container">
        <Link
          className="navbar-brand border-end pe-4"
          to="/"
        >
          React
        </Link>
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
