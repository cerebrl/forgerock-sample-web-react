/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
// import { DEBUGGER } from '../../constants';
import Loading from '../utilities/loading';
import { AppContext } from '../../global-state';

/**
 * @function Form - React component for managing the user authentication journey
 * @param {Object} props - props object from React
 * @param {Object} props.action - Action object for a "reducer" pattern
 * @param {string} props.action.type - Action type string that represents the action
 * @param {Object} props.followUp - A function that should be run after successful authentication
 * @returns {Object} - React component object
 */
export default function Form({ action, bottomMessage, followUp, topMessage }) {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey.
   *
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  // Used for setting global authentication state
  const [state, methods] = useContext(AppContext);

  return <Loading message="Checking your session ..." />;
}
