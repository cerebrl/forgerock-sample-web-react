/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Config from '../config';
import middlewareWrapper from '../util/middleware';
import OAuth2Client, { allowedErrors, ResponseType } from '../oauth2-client';
import TokenStorage from '../token-storage';
import PKCE from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { parseQuery } from '../util/url';
import { ActionTypes } from '../config/enums';
var TokenManager = /** @class */ (function () {
    function TokenManager() {
    }
    /**
     * Token Manager class that provides high-level abstraction for Authorization Code flow,
     * PKCE value generation, token exchange and token storage.
     *
     * Supports both embedded authentication as well as external authentication via redirects
     *
     Example 1:
  
     ```js
     const tokens = forgerock.TokenManager.getTokens({
       forceRenew: true, // If you want to get new tokens, despite existing ones
       login: 'embedded', // If user authentication is handled in-app
       support: 'legacy', // Set globally or locally; `"legacy"` or `undefined` will use iframe
       serverConfig: {
         timeout: 5000, // If using "legacy", use a short timeout to catch error
       },
     });
     ```
  
     Example 2:
  
     ```js
     const tokens = forgerock.TokenManager.getTokens({
       forceRenew: false, // Will immediately return stored tokens, if they exist
       login: 'redirect', // If user authentication is handled in external Web app
       support: 'modern', // Set globally or locally; `"modern"` will use native fetch
     });
     ```
  
     Example 3:
  
     ```js
     const tokens = forgerock.TokenManager.getTokens({
       query: {
         code: 'lFJQYdoQG1u7nUm8 ... ', // Authorization code from redirect URL
         state: 'MTY2NDkxNTQ2Nde3D ... ', // State from redirect URL
       },
     });
     ```
     */
    TokenManager.getTokens = function (options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var tokens, _d, clientId, middleware, serverConfig, support, error_1, error_2, storedString, storedValues, verifier, state, authorizeUrlOptions, authorizeUrl, parsedUrl, _e, sessionCookieName, sessionCookieValue, runMiddleware, init, response, parsedQuery, err_1;
            var _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        tokens = null;
                        _d = Config.get(options), clientId = _d.clientId, middleware = _d.middleware, serverConfig = _d.serverConfig, support = _d.support;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, TokenStorage.get()];
                    case 2:
                        tokens = _g.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _g.sent();
                        console.info('No stored tokens available', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        /**
                         * If tokens are stored and no option for `forceRenew` or `query` object with `code`,
                         * immediately return the stored tokens
                         */
                        if (tokens && !(options === null || options === void 0 ? void 0 : options.forceRenew) && !((_a = options === null || options === void 0 ? void 0 : options.query) === null || _a === void 0 ? void 0 : _a.code)) {
                            return [2 /*return*/, tokens];
                        }
                        if (!tokens) return [3 /*break*/, 9];
                        _g.label = 5;
                    case 5:
                        _g.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, OAuth2Client.revokeToken(options)];
                    case 6:
                        _g.sent();
                        return [4 /*yield*/, TokenManager.deleteTokens()];
                    case 7:
                        _g.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _g.sent();
                        console.warn('Existing tokens could not be revoked or deleted', error_2);
                        return [3 /*break*/, 9];
                    case 9:
                        if (!(((_b = options === null || options === void 0 ? void 0 : options.query) === null || _b === void 0 ? void 0 : _b.code) && ((_c = options === null || options === void 0 ? void 0 : options.query) === null || _c === void 0 ? void 0 : _c.state))) return [3 /*break*/, 11];
                        storedString = window.sessionStorage.getItem(clientId);
                        window.sessionStorage.removeItem(clientId);
                        storedValues = JSON.parse(storedString);
                        return [4 /*yield*/, this.tokenExchange(options, storedValues)];
                    case 10: return [2 /*return*/, _g.sent()];
                    case 11:
                        verifier = PKCE.createVerifier();
                        state = PKCE.createState();
                        authorizeUrlOptions = __assign(__assign({}, options), { responseType: ResponseType.Code, state: state, verifier: verifier });
                        return [4 /*yield*/, OAuth2Client.createAuthorizeUrl(authorizeUrlOptions)];
                    case 12:
                        authorizeUrl = _g.sent();
                        _g.label = 13;
                    case 13:
                        _g.trys.push([13, 18, , 19]);
                        parsedUrl = void 0;
                        if (!(support === 'legacy' || support === undefined)) return [3 /*break*/, 15];
                        _e = URL.bind;
                        return [4 /*yield*/, OAuth2Client.getAuthCodeByIframe(authorizeUrlOptions)];
                    case 14:
                        // To support legacy browsers, iframe works best with short timeout
                        parsedUrl = new (_e.apply(URL, [void 0, _g.sent()]))();
                        return [3 /*break*/, 17];
                    case 15:
                        sessionCookieName = serverConfig.sessionCookieName || 'iPlanetDirectoryPro';
                        sessionCookieValue = localStorage.getItem(sessionCookieName) || '';
                        runMiddleware = middlewareWrapper({
                            url: new URL(authorizeUrl),
                            init: {
                                headers: new Headers((_f = {},
                                    _f[sessionCookieName] = sessionCookieValue,
                                    _f)),
                                mode: 'cors',
                            },
                        }, {
                            type: ActionTypes.Authorize,
                        });
                        init = runMiddleware(middleware).init;
                        return [4 /*yield*/, withTimeout(fetch(authorizeUrl, init), serverConfig.timeout)];
                    case 16:
                        response = _g.sent();
                        parsedUrl = new URL(response.url);
                        _g.label = 17;
                    case 17:
                        // Throw if we have an error param or have no authorization code
                        if (parsedUrl.searchParams.get('error')) {
                            throw Error("".concat(parsedUrl.searchParams.get('error_description')));
                        }
                        else if (!parsedUrl.searchParams.get('code')) {
                            throw Error(allowedErrors.AuthenticationConsentRequired);
                        }
                        parsedQuery = parseQuery(parsedUrl.toString());
                        if (!options) {
                            options = {};
                        }
                        options.query = parsedQuery;
                        return [3 /*break*/, 19];
                    case 18:
                        err_1 = _g.sent();
                        // If authorize request fails, handle according to `login` type
                        if (!(err_1 instanceof Error) || (options === null || options === void 0 ? void 0 : options.login) !== 'redirect') {
                            // Throw for any error if login is NOT of type "redirect"
                            throw err_1;
                        }
                        // Check if error is not one of our allowed errors
                        if (allowedErrors.AuthenticationConsentRequired !== err_1.message &&
                            allowedErrors.AuthorizationTimeout !== err_1.message &&
                            allowedErrors.FailedToFetch !== err_1.message &&
                            allowedErrors.NetworkError !== err_1.message &&
                            // Safari has a very long error message, so we check for a substring
                            !err_1.message.includes(allowedErrors.CORSError)) {
                            // Throw if the error is NOT an explicitly allowed error along with redirect of true
                            // as that is a normal response and just requires a redirect
                            throw err_1;
                        }
                        // Since `login` is configured for "redirect", store authorize values and redirect
                        window.sessionStorage.setItem(clientId, JSON.stringify(authorizeUrlOptions));
                        return [2 /*return*/, window.location.assign(authorizeUrl)];
                    case 19: return [4 /*yield*/, this.tokenExchange(options, { state: state, verifier: verifier })];
                    case 20: 
                    /**
                     * Exchange authorization code for tokens
                     */
                    return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    TokenManager.deleteTokens = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TokenStorage.remove()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenManager.tokenExchange = function (options, stored) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var authorizationCode, verifier, getTokensOptions, tokens, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        /**
                         * Ensure incoming state and stored state are equal and authorization code exists
                         */
                        if (((_a = options.query) === null || _a === void 0 ? void 0 : _a.state) !== stored.state) {
                            throw new Error('State mismatch');
                        }
                        if (!((_b = options.query) === null || _b === void 0 ? void 0 : _b.code) || Array.isArray((_c = options.query) === null || _c === void 0 ? void 0 : _c.code)) {
                            throw new Error('Failed to acquire authorization code');
                        }
                        authorizationCode = (_d = options.query) === null || _d === void 0 ? void 0 : _d.code;
                        verifier = stored.verifier;
                        getTokensOptions = __assign(__assign({}, options), { authorizationCode: authorizationCode, verifier: verifier });
                        return [4 /*yield*/, OAuth2Client.getOAuth2Tokens(getTokensOptions)];
                    case 1:
                        tokens = _e.sent();
                        if (!tokens || !tokens.accessToken) {
                            throw new Error('Unable to exchange authorization for tokens');
                        }
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, TokenStorage.set(tokens)];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _e.sent();
                        console.error('Failed to store tokens', error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, tokens];
                }
            });
        });
    };
    return TokenManager;
}());
export default TokenManager;
//# sourceMappingURL=index.js.map