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
import { ActionTypes } from '../config/enums';
import Config from '../config/index';
import TokenStorage from '../token-storage';
import { isOkOr4xx } from '../util/http';
import PKCE from '../util/pkce';
import { withTimeout } from '../util/timeout';
import { getEndpointPath, resolve, stringify } from '../util/url';
import { ResponseType } from './enums';
import middlewareWrapper from '../util/middleware';
var allowedErrors = {
    // AM error for consent requirement
    AuthenticationConsentRequired: 'Authentication or consent required',
    // Manual iframe error
    AuthorizationTimeout: 'Authorization timed out',
    // Chromium browser error
    FailedToFetch: 'Failed to fetch',
    // Mozilla browser error
    NetworkError: 'NetworkError when attempting to fetch resource.',
    // Webkit browser error
    CORSError: 'Cross-origin redirection',
};
/**
 * OAuth 2.0 client.
 */
var OAuth2Client = /** @class */ (function () {
    function OAuth2Client() {
    }
    OAuth2Client.createAuthorizeUrl = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, middleware, redirectUri, scope, requestParams, challenge, runMiddleware, url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Config.get(options), clientId = _a.clientId, middleware = _a.middleware, redirectUri = _a.redirectUri, scope = _a.scope;
                        requestParams = __assign(__assign({}, options.query), { client_id: clientId, redirect_uri: redirectUri, response_type: options.responseType, scope: scope, state: options.state });
                        if (!options.verifier) return [3 /*break*/, 2];
                        return [4 /*yield*/, PKCE.createChallenge(options.verifier)];
                    case 1:
                        challenge = _b.sent();
                        requestParams.code_challenge = challenge;
                        requestParams.code_challenge_method = 'S256';
                        _b.label = 2;
                    case 2:
                        runMiddleware = middlewareWrapper({
                            url: new URL(this.getUrl('authorize', requestParams, options)),
                            init: {},
                        }, { type: ActionTypes.Authorize });
                        url = runMiddleware(middleware).url;
                        return [2 /*return*/, url.toString()];
                }
            });
        });
    };
    /**
     * Calls the authorize URL with an iframe. If successful,
     * it returns the callback URL with authentication code,
     * optionally using PKCE.
     * Method renamed in v3.
     * Original Name: getAuthorizeUrl
     * New Name: getAuthCodeByIframe
     */
    OAuth2Client.getAuthCodeByIframe = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, serverConfig;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createAuthorizeUrl(options)];
                    case 1:
                        url = _a.sent();
                        serverConfig = Config.get(options).serverConfig;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var iframe = document.createElement('iframe');
                                // Define these here to avoid linter warnings
                                var noop = function () {
                                    return;
                                };
                                var onLoad = noop;
                                var cleanUp = noop;
                                var timeout = 0;
                                cleanUp = function () {
                                    window.clearTimeout(timeout);
                                    iframe.removeEventListener('load', onLoad);
                                    iframe.remove();
                                };
                                onLoad = function () {
                                    if (iframe.contentWindow) {
                                        var newHref = iframe.contentWindow.location.href;
                                        if (_this.containsAuthCode(newHref)) {
                                            cleanUp();
                                            resolve(newHref);
                                        }
                                        else if (_this.containsAuthError(newHref)) {
                                            cleanUp();
                                            resolve(newHref);
                                        }
                                    }
                                };
                                timeout = window.setTimeout(function () {
                                    cleanUp();
                                    reject(new Error(allowedErrors.AuthorizationTimeout));
                                }, serverConfig.timeout);
                                iframe.style.display = 'none';
                                iframe.addEventListener('load', onLoad);
                                document.body.appendChild(iframe);
                                iframe.src = url;
                            })];
                }
            });
        });
    };
    /**
     * Exchanges an authorization code for OAuth tokens.
     */
    OAuth2Client.getOAuth2Tokens = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, redirectUri, requestParams, body, init, response, responseBody, message, responseObject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Config.get(options), clientId = _a.clientId, redirectUri = _a.redirectUri;
                        requestParams = {
                            client_id: clientId,
                            code: options.authorizationCode,
                            grant_type: 'authorization_code',
                            redirect_uri: redirectUri,
                        };
                        if (options.verifier) {
                            requestParams.code_verifier = options.verifier;
                        }
                        body = stringify(requestParams);
                        init = {
                            body: body,
                            headers: new Headers({
                                'content-length': body.length.toString(),
                                'content-type': 'application/x-www-form-urlencoded',
                            }),
                            method: 'POST',
                        };
                        return [4 /*yield*/, this.request('accessToken', undefined, false, init, options)];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, this.getBody(response)];
                    case 2:
                        responseBody = _b.sent();
                        if (response.status !== 200) {
                            message = typeof responseBody === 'string'
                                ? "Expected 200, received ".concat(response.status)
                                : this.parseError(responseBody);
                            throw new Error(message);
                        }
                        responseObject = responseBody;
                        if (!responseObject.access_token) {
                            throw new Error('Access token not found in response');
                        }
                        return [2 /*return*/, {
                                accessToken: responseObject.access_token,
                                idToken: responseObject.id_token,
                                refreshToken: responseObject.refresh_token,
                            }];
                }
            });
        });
    };
    /**
     * Gets OIDC user information.
     */
    OAuth2Client.getUserInfo = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('userInfo', undefined, true, undefined, options)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new Error("Failed to get user info; received ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, json];
                }
            });
        });
    };
    /**
     * Invokes the OIDC end session endpoint.
     */
    OAuth2Client.endSession = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var idToken, query, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TokenStorage.get()];
                    case 1:
                        idToken = (_a.sent()).idToken;
                        query = {};
                        if (idToken) {
                            query.id_token_hint = idToken;
                        }
                        return [4 /*yield*/, this.request('endSession', query, true, undefined, options)];
                    case 2:
                        response = _a.sent();
                        if (!isOkOr4xx(response)) {
                            throw new Error("Failed to end session; received ".concat(response.status));
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Immediately revokes the stored access token.
     */
    OAuth2Client.revokeToken = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var clientId, accessToken, init, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = Config.get(options).clientId;
                        return [4 /*yield*/, TokenStorage.get()];
                    case 1:
                        accessToken = (_a.sent()).accessToken;
                        init = {
                            body: stringify({ client_id: clientId, token: accessToken }),
                            headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
                            method: 'POST',
                        };
                        return [4 /*yield*/, this.request('revoke', undefined, false, init, options)];
                    case 2:
                        response = _a.sent();
                        if (!isOkOr4xx(response)) {
                            throw new Error("Failed to revoke token; received ".concat(response.status));
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    OAuth2Client.request = function (endpoint, query, includeToken, init, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, middleware, serverConfig, url, getActionType, accessToken, runMiddleware, req;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Config.get(options), middleware = _a.middleware, serverConfig = _a.serverConfig;
                        url = this.getUrl(endpoint, query, options);
                        getActionType = function (endpoint) {
                            switch (endpoint) {
                                case 'accessToken':
                                    return ActionTypes.ExchangeToken;
                                case 'endSession':
                                    return ActionTypes.EndSession;
                                case 'revoke':
                                    return ActionTypes.RevokeToken;
                                default:
                                    return ActionTypes.UserInfo;
                            }
                        };
                        init = init || {};
                        if (!includeToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, TokenStorage.get()];
                    case 1:
                        accessToken = (_b.sent()).accessToken;
                        init.headers = (init.headers || new Headers());
                        init.headers.set('authorization', "Bearer ".concat(accessToken));
                        _b.label = 2;
                    case 2:
                        runMiddleware = middlewareWrapper({ url: new URL(url), init: init }, { type: getActionType(endpoint) });
                        req = runMiddleware(middleware);
                        return [4 /*yield*/, withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout)];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    OAuth2Client.containsAuthCode = function (url) {
        return !!url && /code=([^&]+)/.test(url);
    };
    OAuth2Client.containsAuthError = function (url) {
        return !!url && /error=([^&]+)/.test(url);
    };
    OAuth2Client.getBody = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentType = response.headers.get('content-type');
                        if (!(contentType && contentType.indexOf('application/json') > -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.json()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OAuth2Client.parseError = function (json) {
        if (json) {
            if (json.error && json.error_description) {
                return "".concat(json.error, ": ").concat(json.error_description);
            }
            if (json.code && json.message) {
                return "".concat(json.code, ": ").concat(json.message);
            }
        }
        return undefined;
    };
    OAuth2Client.getUrl = function (endpoint, query, options) {
        var _a = Config.get(options), realmPath = _a.realmPath, serverConfig = _a.serverConfig;
        var path = getEndpointPath(endpoint, realmPath, serverConfig.paths);
        var url = resolve(serverConfig.baseUrl, path);
        if (query) {
            url += "?".concat(stringify(query));
        }
        return url;
    };
    return OAuth2Client;
}());
export default OAuth2Client;
export { allowedErrors, ResponseType, };
//# sourceMappingURL=index.js.map