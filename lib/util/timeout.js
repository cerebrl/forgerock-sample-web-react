/*
 * @forgerock/javascript-sdk
 *
 * timeout.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { DEFAULT_TIMEOUT } from '../config';
/**
 * @module
 * @ignore
 * These are private utility functions
 */
function withTimeout(promise, timeout) {
    if (timeout === void 0) { timeout = DEFAULT_TIMEOUT; }
    var effectiveTimeout = timeout || DEFAULT_TIMEOUT;
    var timeoutP = new Promise(function (_, reject) {
        return window.setTimeout(function () { return reject(new Error('Timeout')); }, effectiveTimeout);
    });
    return Promise.race([promise, timeoutP]);
}
export { withTimeout };
//# sourceMappingURL=timeout.js.map