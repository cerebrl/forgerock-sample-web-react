/*
 * forgerock-sample-web-react
 *
 * register.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

import apiRequest from '../utilities/request.js';
import NewUserIcon from '../components/icons/new-user-icon.js';
import Form from '../components/form.js';

/**
 * @function Register - React view for Register
 * @returns {Object} - React JSX view
 */
export default function Register() {
  async function initUserInDb() {
    await apiRequest(`users`, 'POST');
  }

  return (
    <div className="container h-100">
      <div className="d-flex align-items-center h-100">
        <div className="card shadow-sm p-5 w-100">
          <div className="register_key-icon align-self-center mb-3">
            <NewUserIcon size="72px" />
          </div>
          <h1 className="text-center fs-2 mb-3">Register</h1>
          <Form action={{ type: 'register' }} followUp={initUserInDb} />
        </div>
      </div>
    </div>
  );
}
