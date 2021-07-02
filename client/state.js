/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect, useState } from 'react';
import initRoutes from './routes.js';

/**
 * @function useStateMgmt - The global state/store for managing user authentication and page
 * @param {boolean} isAuthenticated - Stored authentication state of user
 * @returns {Array} - Global state
 */
export function useStateMgmt(isAuthenticated, currentPage) {
  /**
   * Create two state properties for authentication and page.
   * The destructing of the array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [authenticated, setAuthentication] = useState(isAuthenticated || false);
  const [page, setPage] = useState(currentPage || 'home');

  /**
   * @function setAuthenticationWrapper - A wrapper for storing authentication in sessionStorage
   * @param {boolean} value - current user authentication
   * @returns {void}
   */
  function setAuthenticationWrapper(value) {
    window.sessionStorage.setItem('sdk_authenticated', `${value}`);
    setAuthentication(value);
  }

  /**
   * Since we are setting state from outside of React's scope (from routing layer),
   * that would be considered a side-effect. Hence, the use of useEffect here.
   */
  useEffect(function () {
    initRoutes(setAuthenticationWrapper, setPage);
  });

  /**
   * returns an array with state object as index zero and setters as index one
   */
  return [
    { authenticated, page },
    {
      setAuthentication: setAuthenticationWrapper,
      setPage,
    },
  ];
}

/**
 * @constant AppContext - Creates React Context API
 * This provides the capability to set a global state in React
 * without having to pass the state as props through parent-child components.
 */
export const AppContext = React.createContext([{}, {}]);
