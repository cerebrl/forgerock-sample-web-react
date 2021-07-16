/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

import KeyIcon from '../components/icons/key-icon.js';
import Form from '../components/form.js';

/**
 * @function Login - React view for Login
 * @returns {Object} - React JSX view
 */
export default function Login() {

  return (
    <div className="container_max-width container-fluid h-100">
      <div className="d-flex align-items-center h-100">
        <div className="card shadow-sm p-5 w-100">
          <div className="login_key-icon align-self-center mb-3">
            <KeyIcon size="72px" />
          </div>
          <h1 className="text-center fs-2 mb-3">Login</h1>
          <Form action={{ type: 'login' }} />
        </div>
      </div>
    </div>
  );
}
