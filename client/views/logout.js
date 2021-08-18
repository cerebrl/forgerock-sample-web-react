/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect } from 'react';
import { FRUser } from '@forgerock/javascript-sdk';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../global-state';
import Loading from '../components/utilities/loading';

/**
 * @function Logout - React view for Logout
 * @returns {Object} - React component object
 */
export default function Logout() {
  /**
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [_, { setAuthentication, setEmail, setUser }] = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    async function logout() {
      try {
        await FRUser.logout();

        setAuthentication(false);
        setEmail('');
        setUser('');
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    }

    logout();
  }, []);

  return <Loading classes="pt-5" message="You're being logged out ..." />;
}
