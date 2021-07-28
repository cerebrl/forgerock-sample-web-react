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
 * @returns {Object} - React component object
 */
export default function Unknown() {
  return (
    <div className="form-group">
      <p>{'Warning: an unknown callback is present!'}</p>
    </div>
  );
}
