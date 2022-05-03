/*
 * forgerock-sample-web-react
 *
 * header.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AccountIcon from '../icons/account-icon';
import { AppContext } from '../../global-state';
import ForgeRockIcon from '../icons/forgerock-icon';
import HomeIcon from '../icons/home-icon';
import ReactIcon from '../icons/react-icon';
import TodosIcon from '../icons/todos-icon';

import LoginWidget, { modal, user } from 'forgerock-web-login-widget/modal';
import 'forgerock-web-login-widget/widget.css';

/**
 * @function Header - Header React view
 * @returns {Object} - React component object
 */
export default function Header() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [state, methods] = useContext(AppContext);
  const location = useLocation();

  let TodosItem;
  let LoginOrOutItem;

  useEffect(() => {
    new LoginWidget({
      target: document.getElementById('login-widget'),
      props: {
        config: {
          clientId: 'WebOAuthClient', // e.g. 'ForgeRockSDKClient'
          // redirectUri: 'https://react.crbrl.ngrok.io/callback',
          redirectUri: 'https://react.example.com/8443',
          scope: 'openid profile me.read', // e.g. 'openid profile me.read'
          serverConfig: {
            baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
            // baseUrl: 'https://crbrl.ngrok.io/proxy', // e.g. 'https://openam.example.com:9443/openam/'
            timeout: 30000, // 90000 or less
            // paths: {
            //   authenticate: 'authenticate',
            //   authorize: 'authorize',
            //   accessToken: 'access-token',
            //   endSession: 'end-session',
            //   userInfo: 'userinfo',
            //   revoke: 'revoke',
            //   sessions: 'sessions',
            // },
          },
          realmPath: 'alpha', // e.g. 'root'
          tree: 'Login', // e.g. 'Login'
        },
      },
    });
  }, []);

  /**
   * Render different navigational items depending on authenticated status
   */
  if (state.isAuthenticated) {
    TodosItem = [
      <li
        key="home"
        className={`cstm_nav-item ${
          location.pathname === '/' ? 'cstm_nav-item_active' : ''
        } nav-item mx-1`}
      >
        <Link
          className="cstm_nav-link nav-link d-flex align-items-center h-100 p-0 ps-1"
          to="/"
        >
          <HomeIcon />
          <span className="px-2 fs-6">Home</span>
        </Link>
      </li>,
      <li
        key="todos"
        className={`cstm_nav-item ${
          location.pathname === '/todos' ? 'cstm_nav-item_active' : ''
        } nav-item`}
      >
        <Link
          className="cstm_nav-link nav-link d-flex align-items-center h-100 p-0 ps-2"
          to="/todos"
        >
          <TodosIcon />
          <span className="px-2 fs-6">Todos</span>
        </Link>
      </li>,
    ];
    LoginOrOutItem = (
      <div className="d-flex align-items-center">
        <div className="dropdown text-end">
          <button
            aria-expanded="false"
            className="btn h-auto p-0"
            data-bs-toggle="dropdown"
            id="account_dropdown"
          >
            <AccountIcon classes="cstm_profile-icon" size="48px" />
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end shadow-sm pb-0 ${state.theme.dropdownClass}`}
            aria-labelledby="account_dropdown"
          >
            <li>
              <div
                className={`dropdown-header border-bottom ${state.theme.borderClass}`}
              >
                <p
                  className={`fw-bold fs-6 mb-0 ${
                    state.theme.textClass ? state.theme.textClass : 'text-dark'
                  }`}
                >
                  {state.username}
                </p>
                <p className="mb-2">{state.email}</p>
              </div>
            </li>
            <li>
              <button className="dropdown-item py-2" onClick={User.logout}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    TodosItem = null;
    LoginOrOutItem = (
      <div className="d-flex py-3">
        <button
          className={`btn btn-link cstm_login-link py-2 px-3 mx-1 ${
            state.theme.mode === 'dark' ? 'cstm_login-link_dark' : ''
          }`}
          onClick={modal.open}
        >
          Sign In
        </button>
        <Link className="btn btn-primary" to="/register">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <nav
      className={`navbar navbar-expand ${state.theme.navbarClass} ${state.theme.borderHighContrastClass} py-0 border-bottom`}
    >
      <div className="cstm_container container-fluid d-flex align-items-stretch">
        <Link
          to="/"
          className={`cstm_navbar-brand ${
            state.isAuthenticated ? 'cstm_navbar-brand_auth' : ''
          } navbar-brand ${
            state.isAuthenticated ? 'd-none d-sm-none d-md-block' : ''
          } py-3 pe-4 me-4 ${state.theme.borderHighContrastClass}`}
        >
          <ForgeRockIcon size="31px" /> + <ReactIcon size="38px" />
        </Link>
        <div
          className="navbar-collapse d-flex align-items-stretch"
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
