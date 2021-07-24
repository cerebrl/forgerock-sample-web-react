/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRAuth, TokenManager, UserManager } from '@forgerock/javascript-sdk';
import { useEffect, useState } from 'react';

import { htmlDecode } from '../../utilities/decode';

/**
 *
 * @param {Object} props - React props object
 * @param {Object} props.action - Action object for a "reducer" pattern
 * @param {string} props.action.type - Action type string that represents the action
 * @param {Object} props.form - The form metadata object
 * @returns {Object} - React JSX view
 */
export default function useJourneyHandler({ action, form }) {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current global state.
   *
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  // Form level errors
  const [formFailureMessage, setFormFailureMessage] = useState(null);
  // Password registration errors
  const [passwordFailureMessage, setPasswordFailureMessage] = useState(null);
  // Step to render
  const [renderStep, setRenderStep] = useState(null);
  // Step to submit
  const [submissionStep, setSubmissionStep] = useState(null);
  // Processing submission
  const [submittingForm, setSubmittingForm] = useState(false);
  // User state
  const [user, setUser] = useState(null);

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects.
   * This will allow the view to render, but update/re-render after the request completes.
   */
  useEffect(() => {
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
      const user = await UserManager.getCurrentUser();
      setUser(user);
    }

    /**
     * @function getStep - The function for calling AM with a previous step to get a new step
     * @param {Object} prev - This is the previous step that should contain the input for AM
     * @returns {undefined}
     */
    async function getStep(prev) {
      /**
       * Save previous step information just in case we have a
       * registration failure due to password validation errors.
       */
      const previousCallbacks = prev && prev.callbacks;
      const previousPayload = prev && prev.payload;

      /**
       * Call the SDK's next method to submit the current step.
       */
      const nextStep = await FRAuth.next(prev, { tree: form.tree });

      /**
       * Condition for handling start, error handling and completion
       * of login journey.
       */
      if (nextStep.type === 'LoginSuccess') {
        // User is authenticated, now call for OAuth tokens
        getOAuth();
      } else if (
        /**
         * Special error handling for password validation failures
         * in registration form. Submission will respond with 401
         * along with a special "Constraint Violation" error message.
         */
        action.type === 'register' &&
        nextStep.type === 'LoginFailure' &&
        nextStep.payload.message.includes('Constraint Violation')
      ) {
        let messageArray = nextStep.payload.message.split(':');
        setPasswordFailureMessage(htmlDecode(messageArray[2]));

        const newStep = await FRAuth.next(null, { tree: form.tree });
        newStep.callbacks = previousCallbacks;
        newStep.payload = previousPayload;

        setRenderStep(newStep);
        setSubmittingForm(false);
      } else if (nextStep.type === 'LoginFailure') {
        /**
         * Handle basic form error
         */
        setFormFailureMessage(htmlDecode(nextStep.payload.message));

        const newStep = await FRAuth.next(null, { tree: form.tree });
        newStep.callbacks = previousCallbacks;
        newStep.payload = previousPayload;

        setRenderStep(newStep);
        setSubmittingForm(false);
      } else {
        /**
         * If we got here, then the form submission was both successful
         * and requires additional step rendering.
         */
        setRenderStep(nextStep);
        setSubmittingForm(false);
      }
    }

    /**
     * Kickstart the authentication journey!
     * submissionStep will initially be `null`, and that's intended.
     */
    getStep(submissionStep);
  }, [action.type, form.tree, submissionStep]);

  return [
    {
      formFailureMessage,
      passwordFailureMessage,
      renderStep,
      submittingForm,
      user,
    },
    {
      setRenderStep,
      setSubmissionStep,
      setSubmittingForm,
    },
  ];
}
