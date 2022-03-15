/*
 * @forgerock/javascript-sdk
 *
 * url.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { getRealmUrlPath } from '../util/realm';
/**
 * Returns the base URL including protocol, hostname and any non-standard port.
 * The returned URL does not include a trailing slash.
 */
function getBaseUrl(url) {
    var isNonStandardPort = (url.protocol === 'http:' && ['', '80'].indexOf(url.port) === -1) ||
        (url.protocol === 'https:' && ['', '443'].indexOf(url.port) === -1);
    var port = isNonStandardPort ? ":".concat(url.port) : '';
    var baseUrl = "".concat(url.protocol, "//").concat(url.hostname).concat(port);
    return baseUrl;
}
function getEndpointPath(endpoint, realmPath, customPaths) {
    var realmUrlPath = getRealmUrlPath(realmPath);
    var defaultPaths = {
        authenticate: "json/".concat(realmUrlPath, "/authenticate"),
        authorize: "oauth2/".concat(realmUrlPath, "/authorize"),
        accessToken: "oauth2/".concat(realmUrlPath, "/access_token"),
        endSession: "oauth2/".concat(realmUrlPath, "/connect/endSession"),
        userInfo: "oauth2/".concat(realmUrlPath, "/userinfo"),
        revoke: "oauth2/".concat(realmUrlPath, "/token/revoke"),
        sessions: "json/".concat(realmUrlPath, "/sessions/"),
    };
    if (customPaths && customPaths[endpoint]) {
        // TypeScript is not correctly reading the condition above
        // It's thinking that customPaths[endpoint] may result in undefined
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return customPaths[endpoint];
    }
    else {
        return defaultPaths[endpoint];
    }
}
function resolve(baseUrl, path) {
    var url = new URL(baseUrl);
    if (path.startsWith('/')) {
        return "".concat(getBaseUrl(url)).concat(path);
    }
    var basePath = url.pathname.split('/');
    var destPath = path.split('/').filter(function (x) { return !!x; });
    var newPath = __spreadArray(__spreadArray([], basePath.slice(0, -1), true), destPath, true).join('/');
    return "".concat(getBaseUrl(url)).concat(newPath);
}
function parseQuery(fullUrl) {
    var url = new URL(fullUrl);
    var query = {};
    url.searchParams.forEach(function (v, k) { return (query[k] = v); });
    return query;
}
function stringify(data) {
    var pairs = [];
    for (var k in data) {
        if (data[k]) {
            pairs.push(k + '=' + encodeURIComponent(data[k]));
        }
    }
    return pairs.join('&');
}
export { getBaseUrl, getEndpointPath, parseQuery, resolve, stringify };
//# sourceMappingURL=url.js.map