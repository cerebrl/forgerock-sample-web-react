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

import Card from '../components/layout/card';
import apiRequest from '../utilities/request';
import NewUserIcon from '../components/icons/new-user-icon';
import Form from '../components/journey/form';

/**
 * @function Register - React view for Register
 * @returns {Object} - React JSX view
 */
export default function Register() {
  async function initUserInDb() {
    await apiRequest(`users`, 'POST');
  }

  return (
    <div className="cstm_container_max-width_v-centered container-fluid d-flex align-items-center">
      <Card>
        <div className="cstm_register_add-user-icon align-self-center mb-3">
          <NewUserIcon size="72px" />
        </div>
        <Form action={{ type: 'register' }} followUp={initUserInDb} />
      </Card>
    </div>
  );
}
