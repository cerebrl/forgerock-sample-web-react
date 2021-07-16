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

import AlertIcon from '../icons/alert-icon';

/**
 * @function Failure - React component used for retrieving the device profile
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.reload - method for reloading the form
 * @returns {Object} - React JSX view
 */
export default function Failure({ message }) {
  return (
    <p
      className="alert alert-danger d-flex align-items-center mt-5"
      role="alert"
    >
      <AlertIcon classes="alert_icon col-1" />
      <span className="ps-2">
        { message }
      </span>
    </p>
  );
}
