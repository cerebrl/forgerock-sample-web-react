/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRAuth, TokenManager } from '@forgerock/javascript-sdk';
import page from 'page';
import React, { Fragment, useContext, useEffect, useState } from 'react';

import Choice from '../components/login/choice.js';
import DeviceProfile from '../components/login/device-profile.js';
import Password from '../components/login/password.js';
import Unknown from '../components/login/unknown.js';
import Username from '../components/login/username.js';
import UsernamePassword from '../components/login/username-password.js';

import { AppContext } from '../state.js';

/**
 * @function Login - React view for managing the user authentication journey
 * @returns {Object} - React JSX view
 */
export default function Login() {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current state.
   */
  const [_, methods] = useContext(AppContext);
  const [step, setStep] = useState(null);

  /**
   * Component types
   * StageComponent is intended for uniquely rendering a Step that is
   * defined by the stage property of a page node.
   * StepComponents are generic callback components that will be
   * generically rendered.
   * MessageComponent is intended for simply rendering messages to screen.
   */
  let StageComponent;
  let StepComponents = [];
  let MessageComponent;

  let title;

  /**
   * @function submitStep - Handles the submission of the step to AM
   * @param {Object} previousStep - Previous step in the login journey
   */
  async function submitStep(previousStep) {
    const nextStep = await FRAuth.next(previousStep);
    setStep(nextStep);
  }

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects
   * This will allow the view to render, but update/rerender after the request completes
   */
  useEffect(function () {
    /**
     * @function getInitialStep - The function to call when there's no previous step
     */
    async function getInitialStep() {
      const nextStep = await FRAuth.next();
      setStep(nextStep);
    }
    /**
     * @function completeAuth - The function to call when we get a LoginSuccess
     */
    async function completeAuth() {
      await TokenManager.getTokens({ forceRenew: true });
      methods.setAuthentication(true);
      page.redirect('/');
    }

    /**
     * Condition for handling start and stop of login journey.
     * Here's where you should add more error handling.
     */
    if (!step) {
      getInitialStep();
    } else if (step.type === 'LoginSuccess') {
      completeAuth();
    }
  });

  /**
   * Render conditions for presenting appropriate views to user.
   * Adding more steps to a journey would mean more conditions
   * to add here. More error conditions would be good here too.
   */
  if (!step) {
    /**
     * Since there is no step information we need to call AM to retrieve the
     * instructions for rendering the login form.
     */
    title = 'Loading ... ';
    MessageComponent = function Loading() {
      return <p>Checking session ...</p>;
    };
  } else if (step.type === 'LoginSuccess') {
    title = 'Hello again!';
    MessageComponent = function Authenticated(props) {
      return (
        <div id="page_body">
          <p>Redirecting you back to our home page ... </p>
        </div>
      );
    };
  } else if (step.type === 'LoginFailure') {
    title = 'Login failure!';
    MessageComponent = function Error() {
    return (
      <p>It looks like there was a login error.</p>
    );
    };
  } else if (!(step.getStage() === undefined)) {
    /**
     * Since a stage value is used, let's map the stage to an
     * appropriate StageComponent as it will need to be
     * rendered uniquely, rather than generically.
     */
    if (step.getStage() === 'UsernamePassword') {
      title = 'Welcome. Please enter your credentials';
      StageComponent = UsernamePassword;
    } else {
      title = 'Oops, sorry!';
      MessageComponent = function Error() {
        return <p>Stage unknown.</p>;
      };
    }
  } else if (step.callbacks.length > 0) {
    /**
     * Iterate through callbacks mapping the callback to the
     * appropriate callback component, pushing that component
     * the StepComponent's array.
     */
    step.callbacks.map(function (callback) {
      switch(callback.getType()){
        case "ChoiceCallback":
          StepComponents.push(Choice);
          break;
        case "DeviceProfileCallback":
          StepComponents.push(DeviceProfile);
          break;
        case "NameCallback":
          StepComponents.push(Username);
          break;
        case "PasswordCallback":
          StepComponents.push(Password);
          break;
        default:
          // If we don't recognize the callback, render a warning
          StepComponents.push(Unknown);
      }
    });
   } else {
    title = 'Oops, sorry!';
    MessageComponent = function Error() {
      return <p>It looks like there was an error.</p>;
    };
  }

  /**
   * Check if this is a stage, which will render its own form,
   * or a single step or compound step (more than 1 callback).
   */
  if (MessageComponent) {
    return (
      <Fragment>
        <h2 className="mt-4 mb-3">
          {title}
        </h2>
        <MessageComponent step={step} action={submitStep} />
      </Fragment>
    );
  } else if (StageComponent) {
    return (
      <Fragment>
        <h2 className="mt-4 mb-3">
          {title}
        </h2>
        <StageComponent step={step} action={submitStep} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h2 className="mt-4 mb-3">Login</h2>
        <form onSubmit={ function (event) {
          event.preventDefault();
          submitStep(step);
        } }>
          {
            StepComponents.map(function (Component, idx) {
              return <Component key={idx} step={step} />;
            })
          }
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Fragment>
    )
  }
}
