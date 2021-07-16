/*
 * forgerock-sample-web-react
 *
 * unknown.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Unknown- React component used for displaying Unknown callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function Unknown(props) {
  return (
    <div className="form-group">
      <label>{ "Warning: an unknown Callback is present!" }</label>
    </div>
  );
}
