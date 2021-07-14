/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRUser } from '@forgerock/javascript-sdk';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../state.js';
import Loading from '../components/loading.js';

/**
 * @function Logout - React view for Logout
 * @returns {Object} - React JSX view
 */
export default function Logout() {
  /**
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [_, { setAuthentication, setEmail, setUser }] = useContext(AppContext);
  const history = useHistory();

  useEffect(async () => {
    try {
      await FRUser.logout();

      // Clear existing, stored data
      setAuthentication(false);
      setEmail('');
      setUser('');

      // Allow for enough time to communicate the action
      setTimeout(() => history.push('/?action=logout'), 1000);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <Loading message="You're being logged out ..." />;
}
