/*
 * forgerock-sample-web-react
 *
 * server.middleware.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import request from 'superagent';

import { key, cert } from './server.certs.mjs';
import { AM_URL, CONFIDENTIAL_CLIENT, REALM_PATH } from './server.constants.mjs';

/**
 * @function auth - Auth middleware for checking the validity of user's auth
 * @param {Object} req - Node.js' req object
 * @param {Object} res - Node.js' res object
 * @param {function} next - Node.js' req next method to proceed through middleware
 * @return {void}
 */
export async function auth(req, res, next) {
  let response;
  try {
    if (req.headers.authorization) {
      // Call OAuth introspect endpoint
      const [ _, token ] = req.headers.authorization.split(' ');
      response = await request
        .post(`${AM_URL}oauth2/realms/root/realms/${REALM_PATH}/introspect`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Basic ${CONFIDENTIAL_CLIENT}`
        )
        .query({ token });
    } else {
      // Call session validate endpoint
      response = await request
        .post(`${AM_URL}json/sessions/?_action=validate`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set('iPlanetDirectoryPro', req.cookies.iPlanetDirectoryPro)
        .set('Accept-API-Version', 'resource=2.1, protocol=1.0')
        .send({ tokenId: req.cookies.iPlanetDirectoryPro });
    }
  } catch (err) {
    response = {
      body: {},
    };
  }

  if (response.body.active || response.body.valid) {
    next();
  } else {
    res.status(401).send();
  }
}
