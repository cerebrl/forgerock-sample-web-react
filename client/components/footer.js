/*
 * forgerock-sample-web-react
 *
 * footer.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Footer - Footer React view
 * @returns {Object} - React JSX view
 */
export default function Footer() {
  return (
    <div className="container">
      <small className="border-top d-block mt-5 py-5">
        The React name and logomark are properties of <a href="https://reactjs.org">Facebook</a>,
        and the use herein is for learning and illustrative purposes only.
      </small>
    </div>
  );
}
