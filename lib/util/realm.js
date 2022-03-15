/*
 * @forgerock/javascript-sdk
 *
 * realm.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/** @hidden */
function getRealmUrlPath(realmPath) {
    // Split the path and scrub segments
    var names = (realmPath || '')
        .split('/')
        .map(function (x) { return x.trim(); })
        .filter(function (x) { return x !== ''; });
    // Ensure 'root' is the first realm
    if (names[0] !== 'root') {
        names.unshift('root');
    }
    // Concatenate into a URL path
    var urlPath = names.map(function (x) { return "realms/".concat(x); }).join('/');
    return urlPath;
}
export { getRealmUrlPath };
//# sourceMappingURL=realm.js.map