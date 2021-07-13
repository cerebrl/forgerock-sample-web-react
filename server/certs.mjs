/*
 * forgerock-sample-web-react
 *
 * server.certs.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

export const key = process.env.SEC_KEY.replace(/\\n/gm, '\n');
export const cert = process.env.SEC_CERT.replace(/\\n/gm, '\n');
