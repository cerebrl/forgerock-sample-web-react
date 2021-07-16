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
import { Link, useLocation } from 'react-router-dom';

import AccountIcon from './icons/account-icon.js';
import { AppContext } from '../state.js';
import ForgeRockIcon from './icons/forgerock-icon.js';
import ReactIcon from './icons/react-icon.js';
import TodosIcon from './icons/todos-icon.js';

/**
 * @function Header - Header React view
 * @returns {Object} - React JSX view
 */
export default function Header() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [state] = useContext(AppContext);
  const location = useLocation();
  let TodosItem;
  let LoginOrOutItem;

  /**
   * Render different navigational items depending on authenticated status
   */
  switch (state.isAuthenticated) {
    case true:
      TodosItem = (
        <li
          className={`header_nav-item ${
            location.pathname === '/todos' ? 'header_nav-item_active' : ''
          } nav-item`}
        >
          <Link
            className="header_nav-link nav-link d-flex align-items-center h-100"
            to="/todos"
          >
            <TodosIcon />
            <span className="px-2 fs-5">Todos</span>
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
              <AccountIcon classes="account_icon" size="48px" />
            </button>
            <ul
              className="account_dropdown-menu dropdown-menu dropdown-menu-end"
              aria-labelledby="account_dropdown"
            >
              <li>
                <div className="dropdown-header border-bottom">
                  <p className="fw-bold mb-0">{state.username}</p>
                  <p className="mb-2">{state.email}</p>
                </div>
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
      break;
    default:
      TodosItem = null;
      LoginOrOutItem = (
        <div className="d-flex py-3">
          <Link className="header_account-link py-2 px-3 mx-1" to="/login">
            Login
          </Link>
          <Link className="btn btn-outline-secondary" to="/register">
            Register
          </Link>
        </div>
      );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-0 border-bottom">
      <div className="container d-flex align-items-stretch">
        <div
          className={`header_navbar-brand ${
            state.isAuthenticated ? 'header_navbar-brand_auth' : ''
          } navbar-brand py-3 pe-4 me-4`}
        >
          <ForgeRockIcon size="31px" /> + <ReactIcon size="38px" />
        </div>
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
        <div
          className="collapse navbar-collapse d-flex align-items-stretch"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex align-items-stretch me-auto">
            {TodosItem}
          </ul>
          {LoginOrOutItem}
        </div>
      </div>
    </nav>
  );
}
