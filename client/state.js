/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Config, FRUser, OAuth2Client, TokenManager } from '@forgerock/javascript-sdk';
import React, { useState } from 'react';

/**
 * @function useStateMgmt - The global state/store for managing user authentication and page
 * @param {Object} props - The object representing React's props
 * @param {Object} props.isAuthenticated - Boolean value of user's auth status
 * @param {Object} props.page - Currently requested page
 * @param {Object} props.email - User's email
 * @param {Object} props.username - User's username
 * @returns {Array} - Global state values and state methods
 */
export function useStateMgmt({ isAuthenticated, page, email, username }) {
  /**
   * Create state properties for "global" state.
   * Using internal names that differ from external to prevent shadowing.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [authenticated, setAuthentication] = useState(isAuthenticated || false);
  const [mail, setEmail] = useState(email || '');
  const [currentPage, setPage] = useState(page || 'home');
  const [name, setUser] = useState(username || '');

  /**
   * @function setAuthenticationWrapper - A wrapper for storing authentication in sessionStorage
   * @param {boolean} value - current user authentication
   * @returns {void}
   */
  async function setAuthenticationWrapper(value) {
    if (value === false) {
      await FRUser.logout();
    }
    setAuthentication(value);
  }

  /**
   * @function setEmailWrapper - A wrapper for storing authentication in sessionStorage
   * @param {string} value - current user's email
   * @returns {void}
   */
  function setEmailWrapper(value) {
    window.sessionStorage.setItem('sdk_email', `${value}`);
    setEmail(value);
  }

  /**
   * @function setUserWrapper - A wrapper for storing authentication in sessionStorage
   * @param {string} value - current user's username
   * @returns {void}
   */
  function setUserWrapper(value) {
    window.sessionStorage.setItem('sdk_username', `${value}`);
    setUser(value);
  }

  /**
   * returns an array with state object as index zero and setters as index one
   */
  return [
    {
      isAuthenticated: authenticated,
      email: mail,
      page: currentPage,
      username: name,
    },
    {
      setAuthentication: setAuthenticationWrapper,
      setEmail: setEmailWrapper,
      setPage,
      setUser: setUserWrapper,
    },
  ];
}

/**
 * @constant AppContext - Creates React Context API
 * This provides the capability to set a global state in React
 * without having to pass the state as props through parent-child components.
 */
export const AppContext = React.createContext([{}, {}]);
