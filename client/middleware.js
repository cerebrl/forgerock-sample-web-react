/*
 * forgerock-sample-web-react
 *
 * middleware.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { UserManager } from '@forgerock/javascript-sdk';

import { SESSION_URL } from './constants.js';

/**
 * @function checkSession - Auth middleware for protecting local routes
 * @param {Object} ctx - The context object from a Page.js route
 * @param {*} next - The function call to proceed to the next middleware
 * @returns {void}
 */
export async function checkSession(ctx, next) {
  let json;

  try {
    const response = await fetch(`${SESSION_URL}?_action=validate`, {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        'accept-api-version': 'protocol=1.0,resource=2.0',
        'x-requested-with': 'forgerock-sdk',
      },
      method: 'POST',
    });

    json = await response.json();
  } catch (err) {
    console.error('User session has been revoked or expired');
    json = {};
  }

  if (json.valid) {
    ctx.setAuthentication(true);
    next();
  } else {
    ctx.setAuthentication(false);
    ctx.page.redirect('/login');
  }
}

/**
 * @function checkAccessToken - Auth middleware for protecting local routes
 * @param {Object} ctx - The context object from a Page.js route
 * @param {*} next - The function call to proceed to the next middleware
 */
export async function checkAccessToken(ctx, next) {
  /**
   * Call user info endpoint.Request will succeed if Access Token is valid
   */
  try {
    await UserManager.getCurrentUser();
    next();
  } catch (err) {
    ctx.setAuthentication(false);
    ctx.page.redirect('/login');
  }
}
