/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRAuth, TokenManager, UserManager } from '@forgerock/javascript-sdk';
import React, {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import AlertIcon from '../components/icons/alert-icon.js';
import Choice from '../components/login/choice.js';
import DeviceProfile from '../components/login/device-profile.js';
import Loading from '../components/loading.js';
import Password from '../components/login/password.js';
import Unknown from '../components/login/unknown.js';
import Text from '../components/login/text.js';

import { AppContext } from '../state.js';

/**
 * @function Form - React view for managing the user authentication journey
 * @returns {Object} - React JSX view
 */
export default function Form({ action, followUp }) {
  const reducer = (_, action) => {
    switch (action.type) {
      case 'login':
        return 'UsernamePassword';
      case 'register':
        return 'Registration';
      case 'forgotPassword':
        return 'ForgotPassword';
      default:
        throw new Error('Login action type not recognized.');
    }
  };
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current state.
   */
  const [_, methods] = useContext(AppContext);
  const [tree, setTree] = useReducer(reducer, reducer(null, action));
  const [renderStep, setRenderStep] = useState(null);
  const [submissionStep, setSubmissionStep] = useState(null);
  const history = useHistory();

  /**
   * Component types
   * StepComponents are generic callback components that will be
   * generically rendered.
   * MessageComponent is intended for simply rendering messages to screen.
   * ErrorComponent is intended for displaying the error
   */
  let ErrorComponent;
  let MessageComponent;
  let StepComponents = [];

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects
   * This will allow the view to render, but update/rerender after the request completes
   */
  useEffect(
    function () {
      /**
       * @function completeAuth - The function to call when we get a LoginSuccess
       */
      async function getOAuth() {
        await TokenManager.getTokens({ forceRenew: true });
        const { email, name: username } = await UserManager.getCurrentUser();

        // Set user info on "global state"
        methods.setUser(username);
        methods.setEmail(email);
        methods.setAuthentication(true);

        // Run follow up function if present
        followUp && await followUp();

        history.push('/');
      }

      /**
       * @function getInitialStep - The function to call when there's no previous step
       */
      async function getStep(prev) {
        const nextStep = await FRAuth.next(prev, { tree });
        /**
         * Condition for handling start and stop of login journey.
         * Here's where you should add more error handling.
         */
        if (nextStep.type === 'LoginSuccess') {
          getOAuth();
        } else if (!nextStep.type === 'LoginError') {
          console.log('Error');
        } else {
          setRenderStep(nextStep);
        }
      }

      getStep(submissionStep);
    },
    [submissionStep]
  );

  /**
   * Render conditions for presenting appropriate views to user.
   * Adding more steps to a journey would mean more conditions
   * to add here. More error conditions would be good here too.
   */
  if (!renderStep) {
    /**
     * Since there is no step information we need to call AM to retrieve the
     * instructions for rendering the login form.
     */
    MessageComponent = () => <Loading message="Checking your session ..." />;
  } else if (renderStep.type === 'LoginSuccess') {
    MessageComponent = () => <Loading message="Success! Redirecting ..." />;
  } else if (renderStep.type === 'LoginFailure') {
    ErrorComponent = () => {
      if (renderStep.type === 'LoginFailure') {
        return (
          <p
            className="alert alert-danger d-flex align-items-center mt-5"
            role="alert"
          >
            <AlertIcon />
            <span className="ps-2">
              Your credentials were incorrect. Please{' '}
              <button
                className="login_reload-btn"
                onClick={async () => {
                  const nextStep = await FRAuth.next();
                  setRenderStep(nextStep);
                }}
              >
                try again
              </button>
              .
            </span>
          </p>
        );
      } else {
        return null;
      }
    };
  } else if (renderStep.callbacks.length > 0) {
    /**
     * Iterate through callbacks mapping the callback to the
     * appropriate callback component, pushing that component
     * the StepComponent's array.
     */
    renderStep.callbacks.map((callback) => {
      switch (callback.getType()) {
        case 'ChoiceCallback':
          StepComponents.push({ Component: Choice, callback });
          break;
        case 'DeviceProfileCallback':
          StepComponents.push({ Component: DeviceProfile, callback });
          break;
        case 'NameCallback':
        case 'ValidatedCreateUsernameCallback':
        case 'StringAttributeInputCallback':
          StepComponents.push({ Component: Text, callback });
          break;
        case 'PasswordCallback':
        case 'ValidatedCreatePasswordCallback':
          StepComponents.push({ Component: Password, callback });
          break;
        default:
          // If we don't recognize the callback, render a warning
          StepComponents.push({ Component: Unknown, callback });
      }
    });
  } else {
    MessageComponent = () => <p>It looks like there was an error.</p>;
  }

  /**
   * Check if there is an error, a message or components to render.
   */
  if (ErrorComponent) {
    return <Fragment>{ErrorComponent()}</Fragment>;
  } else if (MessageComponent) {
    return <Fragment>{MessageComponent()}</Fragment>;
  } else {
    return (
      <Fragment>
        <form
          className="login_form"
          onSubmit={(event) => {
            event.preventDefault();
            // set current step as previous step
            setSubmissionStep(renderStep);
          }}
        >
          {StepComponents.map(({ Component, callback }, idx) => {
            return <Component key={idx} callback={callback} />;
          })}
          <input type="submit" className="btn btn-primary w-100" value="Submit" />
        </form>
      </Fragment>
    );
  }
}
