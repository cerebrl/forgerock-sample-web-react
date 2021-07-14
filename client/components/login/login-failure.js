/*
 * forgerock-sample-web-react
 *
 * device-profile.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function LoginFailure - React component used for retrieving the device profile
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.reload - method for reloading the form
 * @returns {Object} - React JSX view
 */
export default function LoginFailure({ reload }) {
  return (
    <p
      className="alert alert-danger d-flex align-items-center mt-5"
      role="alert"
    >
      <AlertIcon />
      <span className="ps-2">
        Your credentials were incorrect. Please{' '}
        <button className="login_reload-btn" onClick={reload}>
          try again
        </button>
        .
      </span>
    </p>
  );
}
