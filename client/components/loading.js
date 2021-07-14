/*
 * forgerock-sample-web-react
 *
 * loading.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Loading - Used to display a loading message
 * @param {Object} props - The object representing React's props
 * @param {string} props.message - The message string object passed from the parent component
 * @returns {Object} - React JSX view
 */
export default function Loading({ message }) {
  return (
    <div className="container">
      <p className="d-flex justify-content-center align-items-center pt-5">
        <span className="spinner-border text-primary my-2" role="status"></span>
        <span className="p-3 fs-5">{message}</span>
      </p>
    </div>
  );
}
