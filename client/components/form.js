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

import { JOURNEY_LOGIN, JOURNEY_REGISTER } from '../constants.js';
import { htmlDecode } from '../utilities/decode.js';
import Failure from './form/failure.js';
import Choice from './form/choice.js';
import Loading from '../components/loading.js';
import Password from './form/password.js';
import Unknown from './form/unknown.js';
import Text from './form/text.js';

import { AppContext } from '../state.js';

/**
 * @function Form - React view for managing the user authentication journey
 * @returns {Object} - React JSX view
 */
export default function Form({ action, followUp }) {
  /**
   * @function reducer - A simple reducer for determining what tree to call
   * @param {*} _ - Normally the current state, but it's not being used
   * @param {*} action - Object with the property `type` that represents the user action
   * @returns
   */
  const reducer = (_, action) => {
    switch (action.type) {
      case 'login':
        return JOURNEY_LOGIN;
      case 'register':
        return JOURNEY_REGISTER;
      default:
        throw new Error('Form action type not recognized.');
    }
  };
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current global state.
   *
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  // Used for setting global authentication state
  const [_, methods] = useContext(AppContext);
  // Map action to authentication tree
  const [tree] = useReducer(reducer, reducer(null, action));
  // Form level errors
  const [formFailureMessage, setFormFailureMessage] = useState(null);
  // Password registration errors
  const [passwordFailureMessage, setPasswordFailureMessage] = useState(null);
  // Step to render
  const [renderStep, setRenderStep] = useState(null);
  // Step to submit
  const [submissionStep, setSubmissionStep] = useState(null);
  // Used for redirection after success
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
   * Since we have API calls to AM, we need to handle these requests as side-effects.
   * This will allow the view to render, but update/rerender after the request completes.
   */
  useEffect(
    function () {
      /**
       * @function getOAuth - The function to call when we get a LoginSuccess
       * @returns {undefined}
       */
      async function getOAuth() {
        /**
         * Get OAuth/OIDC tokens through the the Authorization Code Flow w/PKCE.
         * We are passing the `forceRenew` option to ensure we get fresh tokens,
         * regardless of existing tokens.
         */
        await TokenManager.getTokens({ forceRenew: true });

        /**
         * Now that we have tokens, call the user info endpoint for some basic user data.
         */
        const { email, name: username } = await UserManager.getCurrentUser();

        /**
         * Set user info on "global state"
         */
        methods.setUser(username);
        methods.setEmail(email);
        methods.setAuthentication(true);

        // Run follow-up function if present
        followUp && (await followUp());

        // Redirect back to the home page
        history.push('/');
      }

      /**
       * @function getStep - The function for calling AM with a previous step to get a new step
       * @param {Object} prev - This is the previous step that should contain the input for AM
       * @returns {undefined}
       */
      async function getStep(prev) {
        // Save just in case we have a registration failure with password
        const previousCallbacks = prev && prev.callbacks;
        const previousPayload = prev && prev.payload;
        const nextStep = await FRAuth.next(prev, { tree });
        /**
         * Condition for handling start and stop of login journey.
         */
        if (nextStep.type === 'LoginSuccess') {
          // User is authenticated, now call for OAuth tokens
          getOAuth();
        } else if (
          /**
           * Special error handling for password validation failures
           * in registration form
           */
          action.type === 'register' &&
          nextStep.type === 'LoginFailure' &&
          nextStep.payload.message.includes('Constraint Violation')
        ) {
          let messageArray = nextStep.payload.message.split(':');
          setPasswordFailureMessage(htmlDecode(messageArray[2]));

          const newStep = await FRAuth.next(null, { tree });
          newStep.callbacks = previousCallbacks;
          newStep.payload = previousPayload;

          setRenderStep(newStep);
        } else if (nextStep.type === 'LoginFailure') {
          /**
           * Handle basic form failure
           */
          setFormFailureMessage(htmlDecode(nextStep.payload.message));

          const newStep = await FRAuth.next(null, { tree });
          newStep.callbacks = previousCallbacks;
          newStep.payload = previousPayload;

          setRenderStep(newStep);
        } else {
          setRenderStep(nextStep);
        }
      }

      /**
       * Kickstart the authentication journey!
       * submissionStep will initially be `null`, and that's intended.
       */
      getStep(submissionStep);
    },
    [submissionStep]
  );

  /**
   * Render conditions for presenting appropriate views to user.
   * First, we need to handle no "step", which means we are waiting for
   * the initial response from AM for authentication.
   *
   * Once we have a step, we then need to ensure we don't already have a
   * success or failure. If we have a step but don't have a success or
   * failure, we will likely have callbacks that we will need to present'
   * to the user in their render component form.
   */
  if (!renderStep) {
    /**
     * Since there is no step information we need to call AM to retrieve the
     * instructions for rendering the login form.
     */
    MessageComponent = () => <Loading message="Checking your session ..." />;
  } else if (renderStep.type === 'LoginSuccess') {
    MessageComponent = () => <Loading message="Success! Redirecting ..." />;
  } else if (renderStep.callbacks.length > 0) {
    /**
     * If there's a login failure, but we've preserved the previous payload for
     * better UX, render the error at the top of the form.
     */
     if (formFailureMessage) {
      StepComponents.push({
        Component: () => <Failure message={formFailureMessage} />,
      });
    }

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
          StepComponents.push({
            Component: Password,
            callback,
            errorMessage: passwordFailureMessage,
          });
          break;
        default:
          // If current callback is not supported it, render a warning
          StepComponents.push({ Component: Unknown, callback });
      }
    });
  } else {
    /**
     * This shouldn't be reached, but it's here just in case things blow up.
     */
    ErrorComponent = () => (
      <Failure
        message={renderStep.payload.message}
        reload={async () => {
          const nextStep = await FRAuth.next(null, { tree });
          setRenderStep(nextStep);
        }}
      />
    );
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
            // set currently rendered step as step to be submitted
            setSubmissionStep(renderStep);
          }}
        >
          {
            /**
             * Take the StepComponent array (callbacks mapped to components),
             * and iteratively render the collection as one form. This way,
             * it can render a single component or any number of components.
             */
            StepComponents.map(({ Component, callback, errorMessage }, idx) => {
              return (
                <Component
                  key={idx}
                  callback={callback}
                  errorMessage={errorMessage}
                />
              );
            })
          }
          <input
            type="submit"
            className="btn btn-primary w-100"
            value="Submit"
          />
        </form>
      </Fragment>
    );
  }
}
