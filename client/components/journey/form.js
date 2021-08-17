/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect, useState, useContext } from 'react';
// import { DEBUGGER } from '../../constants';
import { FRAuth } from '@forgerock/javascript-sdk';
import Loading from '../utilities/loading';
import { AppContext } from '../../global-state';
import Password from './password';
import Text from './text';
import Unknown from './unknown';
import Alert from './alert';

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

  const [step, setStep] = useState(null);
  console.log(step);

  useEffect(() => {
    async function getStep() {
      const step = await FRAuth.start();
      setStep(step);
    }
    getStep();
  }, []);

  function mapCallbacksToComponents(cb, idx) {
    const name = cb?.payload?.input?.[0].name;
    switch (cb.getType()) {
      case 'NameCallback':
        return <Text callback={cb} inputName={name} key="username" />;
      case 'PasswordCallback':
        return <Password callback={cb} inputName={name} key="password" />;
      default:
        // If current callback is not supported, render a warning mess
        return <Unknown callback={cb} key={`unknown-${idx}`} />;
    }
  }

  if (!step) {
    return <Loading message="Checking your session ..." />;
  } else if (step.type === 'LoginSuccess') {
    return <Alert message="Success! You're logged in." type="success" />;
  } else if (step.type === 'Step') {
    return (
      <form
        className="cstm_form"
        onSubmit={async (event) => {
          event.preventDefault();
          const nextStep = await FRAuth.next(step);
          setStep(nextStep);
        }}
      >
        {step.callbacks.map(mapCallbacksToComponents)}
        <button className="btn btn-primary w-100" type="submit">
          Sign In
        </button>
      </form>
    );
  } else {
    return <Error message={step.payload.message} />;
  }
}
