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

import Card from '../components/layout/card';
import KeyIcon from '../components/icons/key-icon';
import Form from '../components/journey/form';

/**
 * @function Login - React view for Login
 * @returns {Object} - React component object
 */
export default function Login() {
  return (
    <div className="cstm_container_max-width_v-centered container-fluid d-flex align-items-center">
      <Card>
        <div className="cstm_login_key-icon align-self-center mb-3">
          <KeyIcon size="72px" />
        </div>
        <Form action={{ type: 'login' }} />
      </Card>
    </div>
  );
}
