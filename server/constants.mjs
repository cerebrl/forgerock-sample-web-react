/*
 * forgerock-sample-web-react
 *
 * server.constants.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const AM_URL = 'https://openam-crbrl-01.forgeblocks.com/am/';
// Base64 encoded string of `ClientName:ClientSecret`
export const CONFIDENTIAL_CLIENT = process.env.OAUTH_SECRET;
export const REALM_PATH = 'alpha';
