/*
 * forgerock-sample-web-react
 *
 * server.auth.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import request from 'superagent';
import { key, cert } from './server.certs.mjs';
import { AM_URL, REALM_PATH } from './server.constants.mjs';

export let session;

/**
 * !!Currently not being used!!
 *
 * @function authorizeApp - Authorizes application to make calls to AM
 * @param {Object} credentials - Credentials representing the app itself
 * @param {string} un - Username
 * @param {string} pw - Password
 * @returns {Object} - Success step
 */
export async function authorizeApp({ un, pw }) {
  const response = await request
    .post(`${AM_URL}json/realms/root/realms/${REALM_PATH}/authenticate?authIndexType=service&authIndexValue=Test`)
    .key(key)
    .cert(cert)
    .set('Content-Type', 'application/json')
    .set('Accept-API-Version', 'resource=2.0, protocol=1.0')
    .set('X-OpenAM-Username', un)
    .set('X-OpenAM-Password', pw)
    .send({});

  session = response.body;

  console.log(`REST app SSO token: ${session.tokenId}`);

  return session;
}
