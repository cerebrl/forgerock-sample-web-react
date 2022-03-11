/*
 * @forgerock/javascript-sdk
 *
 * middleware.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var a = 'a';
var b = 'b';
var one = '1';
var two = '2';
var add = 'ADD';
var reassignment = 'REASSIGNMENT';
var mutateAction = 'MUTATE-ACTION';
var middleware = [
    function (req, action, next) {
        switch (action.type) {
            case a:
            case b:
                req.url.searchParams.set('letter', 'true');
                req.init.headers = __assign({ 'x-letter': 'true' }, req.init.headers);
                break;
            case one:
            case two:
                req.url.searchParams.set('letter', 'false');
                req.init.headers = __assign({ 'x-letter': 'false' }, req.init.headers);
                break;
        }
        next();
    },
    function (req, action, next) {
        switch (action.type) {
            case a:
                req.url.searchParams.set('char', 'a');
                req.init.headers = __assign({ 'x-char': 'a' }, req.init.headers);
                break;
            case b:
                req.url.searchParams.set('char', 'b');
                req.init.headers = __assign({ 'x-char': 'b' }, req.init.headers);
                break;
        }
        next();
    },
    function (req, action, next) {
        switch (action.type) {
            case one:
                req.url.searchParams.set('char', '1');
                req.init.headers = __assign({ 'x-char': '1' }, req.init.headers);
                break;
            case two:
                req.url.searchParams.set('char', '2');
                req.init.headers = __assign({ 'x-char': '2' }, req.init.headers);
                break;
        }
        next();
    },
    function (req, action, next) {
        switch (action.type) {
            case add:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                req.init.headers = __assign({ 'x-char': 'a,' + action.payload }, req.init.headers);
                break;
        }
        next();
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function (req, action, next) {
        switch (action.type) {
            case reassignment:
                req = { url: new URL('https://bad.com'), init: { headers: { 'x-bad': 'true' } } };
                break;
        }
        next();
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function (req, action, next) {
        switch (action.type) {
            case mutateAction:
                action.type = 'hello';
                break;
        }
        next();
    },
];
export default middleware;
//# sourceMappingURL=middleware.mock.data.js.map