/*
 * forgerock-sample-web-react
 *
 * request.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { HttpClient } from '@forgerock/javascript-sdk';

import { API_URL } from '../constants.js';

/**
 * @function request - A convenience function for wrapping around HttpClient
 * @param {string} resource - the resource path for the API server
 * @param {string} method - the method (GET, POST, etc) for the API server
 * @return {Object} - JSON response from API
 */
export default async function apiRequest(resource, method, data) {
  let json;
  try {
    const response = await HttpClient.request({
      url: `${API_URL}/${resource}`,
      init: {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        method: method,
        body: JSON.stringify(data),
      },
    });
    json = await response.json();
  } catch (err) {
    json = {
      error: err.message,
    };
  }

  return json;
}
