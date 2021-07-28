/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useEffect, useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Boolean from './boolean';
import { DEBUGGER } from '../../constants';
import Error from './error';
import Choice from './choice';
import Kba from './kba';
import Loading from '../utilities/loading';
import Password from './password';
import treeReducer from './tree-reducer';
import useJourneyHandler from './journey-state';
import { AppContext } from '../../state';
import TermsConditions from './terms-conditions';
import Text from './text';
import Unknown from './unknown';

/**
 * @function Form - React component for managing the user authentication journey
 * @param {Object} props - props object from React
 * @param {Object} props.action - Action object for a "reducer" pattern
 * @param {string} props.action.type - Action type string that represents the action
 * @param {Object} props.followUp - A function that should be run after successful authentication
 * @returns {Object} - React component object
 */
export default function Form({ action, followUp }) {
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
  const [state, methods] = useContext(AppContext);
  // Map action to form metadata: title, button text and tree
  const [form] = useReducer(treeReducer, treeReducer(null, action));
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
   * Custom "hook" for handling form orchestration
   */
  const [
    {
      formFailureMessage,
      passwordFailureMessage,
      renderStep,
      submittingForm,
      user,
    },
    { setSubmissionStep, setSubmittingForm },
  ] = useJourneyHandler({ action, form });

  /**
   * If the user successfully authenticates, let React complete
   * rendering, then complete setting the state and redirect to home.
   */
  useEffect(() => {
    async function finalizeAuthState() {
      /**
       * First, let's see if we get a user back from the journey hook.
       * If we do, let's set the user data and redirect back to home.
       */
      if (user) {
        /**
         * Set user state/info on "global state"
         */
        methods.setUser(user.name);
        methods.setEmail(user.email);
        methods.setAuthentication(true);

        // Run follow-up function if present
        followUp && (await followUp());

        // Redirect back to the home page
        history.push('/');
      }
    }

    finalizeAuthState();

    // Only `user` is a needed dependency, all others are "stable"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    MessageComponent = <Loading message="Checking your session ..." />;
  } else if (renderStep.type === 'LoginSuccess') {
    MessageComponent = <Loading message="Success! Redirecting ..." />;
  } else if (renderStep.callbacks && renderStep.callbacks.length) {
    /**
     * If there's a login failure, but we've preserved the previous payload for
     * better UX, render the error at the top of the form.
     */
    if (formFailureMessage) {
      StepComponents.push({
        Component: function InlineFormError() {
          return <Error message={formFailureMessage} />;
        },
      });
    }

    /**
     * Iterate through callbacks mapping the callback to the
     * appropriate callback component, pushing that component
     * the StepComponent's array.
     */
    renderStep.callbacks.map((callback) => {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary:SDK callback method for getting the callback type
       * ----------------------------------------------------------------------
       * Details: This method is helpful in quickly identifying the callback
       * when iterating through an unknown list of AM callbacks
       ********************************************************************* */
      if (DEBUGGER) debugger;
      switch (callback.getType()) {
        case 'ChoiceCallback':
          StepComponents.push({ Component: Choice, callback });
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
        case 'BooleanAttributeInputCallback':
          StepComponents.push({
            Component: Boolean,
            callback,
          });
          break;
        case 'TermsAndConditionsCallback':
          StepComponents.push({
            Component: TermsConditions,
            callback,
          });
          break;
        case 'KbaCreateCallback':
          StepComponents.push({
            Component: Kba,
            callback,
          });
          break;
        default:
          /**
           * If current callback is not supported it, render a warning
           */
          StepComponents.push({ Component: Unknown, callback });
      }
    });
  } else {
    /**
     * Just in case things blow up.
     */
    ErrorComponent = <Error message={renderStep.payload.message} />;
  }

  /**
   * Check if there is an error, a message or components to render.
   */
  if (ErrorComponent) {
    // Handles an unrecoverable form failure
    return <Fragment>{ErrorComponent}</Fragment>;
  } else if (MessageComponent) {
    // Handles messaging related to a process, like loading
    return <Fragment>{MessageComponent}</Fragment>;
  } else {
    // Handle form rendering
    return (
      <Fragment>
        <h1 className={`text-center fs-2 mb-3 ${state.theme.textClass}`}>
          {form.titleText}
        </h1>
        <form
          className="cstm_login_form"
          onSubmit={(event) => {
            event.preventDefault();
            // Indicate form processing
            setSubmittingForm(true);
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={submittingForm ? 'disabled' : null}
          >
            {
              /**
               * Render a small spinner during submission calls
               */
              submittingForm ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null
            }
            <span> {form.buttonText}</span>
          </button>
        </form>
      </Fragment>
    );
  }
}
