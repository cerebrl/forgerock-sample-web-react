/*
 * forgerock-sample-web-react
 *
 * username.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Username- React component used for displaying username callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function Username(props) {
  const usernameCb = props.step.getCallbackOfType('NameCallback')
  const usernameLabel = usernameCb.getPrompt();

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event) {
    usernameCb.setName(event.target.value);
  }

  return (
    <div className="form-floating mb-3">
      <input
        onBlur={ setValue }
        type="username"
        name="username"
        className="form-control"
        id="usernameInput"
        aria-describedby="emailHelp"
        placeholder={ usernameLabel }
      />
      <label htmlFor="usernameInput">{ usernameLabel }</label>
    </div>
  );
}
