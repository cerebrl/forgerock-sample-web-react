/*
 * forgerock-sample-web-react
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Config, TokenStorage } from '@forgerock/javascript-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';
import { AM_URL, APP_URL, DEBUGGER, REALM_PATH } from './constants';
import { AppContext, useStateMgmt } from './state';

/**
 * This import will produce a separate CSS file linked in the index.html
 */
import './styles/index.scss';

/**
 * SDK Integration: Configure JS SDK for AM installation
 */
if (DEBUGGER) debugger;
Config.set({
  clientId: 'WebOAuthClient',
  redirectUri: `${APP_URL}/callback`,
  scope: 'openid profile email',
  serverConfig: {
    baseUrl: AM_URL,
    timeout: '5000',
  },
  realmPath: REALM_PATH,
  tree: 'Login',
});

(async function hydrate() {
  /**
   * Pull values from sessionStorage to rehydrate app.
   * Note that all values, even booleans, are strings in session or localStorage.
   */
  const isAuthenticated = !!(await TokenStorage.get());
  const prefersDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const email = window.sessionStorage.getItem('sdk_email');
  const username = window.sessionStorage.getItem('sdk_username');
  const page = new URL(window.location.href).pathname.slice(1);
  const rootEl = document.getElementById('root');

  if (prefersDarkTheme) {
    document.body.classList.add('cstm_bg-dark', 'bg-dark');
  }

  /**
   * @function Init - Initializes React and global state
   * @returns {Object} - React JSX view
   */
  function Init() {
    /**
     * This leverages "global state" with React's Context API.
     * This can be useful to "hydrate" the state with stored data,
     * like this authentication status stored in sessionStorage.
     */
    const stateMgmt = useStateMgmt({
      email,
      isAuthenticated,
      page,
      prefersDarkTheme,
      username,
    });

    return (
      <AppContext.Provider value={stateMgmt}>
        <Router />
      </AppContext.Provider>
    );
  }

  ReactDOM.render(<Init />, rootEl);
})();
