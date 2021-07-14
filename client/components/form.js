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

import LoginFailure from './login/login-failure.js';
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
  /**
   * @function reducer - A simple reducer for determining what tree to call
   * @param {*} _ - Normally the current state, but it's not being used
   * @param {*} action - Object with the property `type` that represents the user action
   * @returns
   */
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
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current state.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [_, methods] = useContext(AppContext);
  const [tree] = useReducer(reducer, reducer(null, action));
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
        const nextStep = await FRAuth.next(prev, { tree });
        /**
         * Condition for handling start and stop of login journey.
         * Here's where you should add more error handling.
         */
        if (nextStep.type === 'LoginSuccess') {
          // User is authenticated, now call for OAuth tokens
          getOAuth();
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
  } else if (renderStep.type === 'LoginFailure') {
    ErrorComponent = () => (
      <LoginFailure
        reload={async () => {
          const nextStep = await FRAuth.next();
          setRenderStep(nextStep);
        }}
      />
    );
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
          // If current callback is not supported it, render a warning
          StepComponents.push({ Component: Unknown, callback });
      }
    });
  } else {
    /**
     * This shouldn't be reached, but it's here just in case things blow up.
     */
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
            StepComponents.map(({ Component, callback }, idx) => {
              return <Component key={idx} callback={callback} />;
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
