/*
 * forgerock-sample-web-react
 *
 * home.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';

import { AppContext } from '../state.js';

/**
 * @function Home - Home React view
 * @returns {Object} - React JSX view
 */
export default function Home() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   */
  const [state] = useContext(AppContext);
  const title = state.authenticated ? 'Hello, again!' : 'Hello, visitor!';
  const message = state.authenticated ? (
    <p>
      Welcome back! Manage <a href="/todos">your todos here</a>.
    </p>
  ) : (
    <p>
      <a href="/login">Login</a> or register to get things done!
    </p>
  );

  return (
    <Fragment>
      <h2 className="mt-4 mb-3">
        {title}
      </h2>
      <div>
        { message }
      </div>
    </Fragment>
  );
}
