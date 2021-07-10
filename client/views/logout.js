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

export default function Logout() {
  const [_, methods] = useContext(AppContext);
  const history = useHistory();

  useEffect(async () => {
    try {
      await FRUser.logout();
      methods.setAuthentication(false);
      // Allow for enough time to communicate the action
      setTimeout(() => history.push('/?action=logout'), 1000);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <Loading message="You're being logged out ..." />;
}
