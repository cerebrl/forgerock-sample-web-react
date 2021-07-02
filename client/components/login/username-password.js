/*
 * forgerock-sample-web-react
 *
 * username-password.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function UsernamePassword - React component used for displaying username and password step
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function UsernamePassword(props) {
  const usernameCb = props.step.getCallbackOfType('NameCallback');
  const passwordCb = props.step.getCallbackOfType('PasswordCallback');
  const usernameLabel = usernameCb.getPrompt();
  const passwordLabel = passwordCb.getPrompt();

  /**
   * @function submitForm - Handles the submission of the form
   * @param {Object} event - Synthetic event object from the DOM event
   */
  function submitForm(event) {
    // Prevent a traditional form submission
    event.preventDefault();
    const un = event.target.elements.username.value;
    const pw = event.target.elements.password.value

    usernameCb.setName(un);
    passwordCb.setPassword(pw);

    // Call the parent function with the captured data
    props.action(props.step);
  }

  return (
    <div id="page_body">
      <form onSubmit={ submitForm }>
        <div className="form-group">
          <label htmlFor="usernameInput">{ usernameLabel }</label>
          <input
            type="username"
            name="username"
            className="form-control"
            id="usernameInput"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">{ passwordLabel }</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="passwordInput"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
