/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { ActionTypes } from '../config/enums';
import Dispatcher from '../event';
import FRAuth from '../fr-auth';
import { StepType } from '../fr-auth/enums';
import FRStep from '../fr-auth/fr-step';
import TokenManager from '../token-manager';
import TokenStorage from '../token-storage';
import { withTimeout } from '../util/timeout';
import { addAuthzInfoToHeaders, addAuthzInfoToURL, buildAuthzOptions, examineForIGAuthz, examineForRESTAuthz, hasAuthzAdvice, isAuthzStep, newTokenRequired, normalizeIGJSON, normalizeRESTJSON, } from './helpers';
import middlewareWrapper from '../util/middleware';
/**
 * HTTP client that includes bearer token injection and refresh.
 * This module also supports authorization for policy protected endpoints.
 *
 * Example:
 *
 * ```js
 * return forgerock.HttpClient.request({
 *   url: `https://example.com/protected/resource`,
 *   init: {
 *     method: 'GET',
 *     credentials: 'include',
 *   },
 *   authorization: {
 *     handleStep: async (step) => {
 *       step.getCallbackOfType('PasswordCallback').setPassword(pw);
 *       return Promise.resolve(step);
 *     },
 *   },
 * });
 * ```
 */
var HttpClient = /** @class */ (function (_super) {
    __extends(HttpClient, _super);
    function HttpClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Makes a request using the specified options.
     *
     * @param options The options to use when making the request
     */
    HttpClient.request = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res, authorizationJSON, hasIG, _a, middleware, realmPath, serverConfig, authzOptions, url, type, tree, runMiddleware, _b, authUrl, authInit, initialStep, tokens, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._request(options, false)];
                    case 1:
                        res = _c.sent();
                        hasIG = false;
                        if (!newTokenRequired(res, options.requiresNewToken)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._request(options, true)];
                    case 2:
                        res = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!(options.authorization && options.authorization.handleStep)) return [3 /*break*/, 16];
                        if (!(res.redirected && examineForIGAuthz(res))) return [3 /*break*/, 4];
                        hasIG = true;
                        authorizationJSON = normalizeIGJSON(res);
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, examineForRESTAuthz(res)];
                    case 5:
                        if (!_c.sent()) return [3 /*break*/, 7];
                        return [4 /*yield*/, normalizeRESTJSON(res)];
                    case 6:
                        authorizationJSON = _c.sent();
                        _c.label = 7;
                    case 7:
                        if (!(authorizationJSON && authorizationJSON.advices)) return [3 /*break*/, 16];
                        _a = Config.get(options.authorization.config), middleware = _a.middleware, realmPath = _a.realmPath, serverConfig = _a.serverConfig;
                        authzOptions = buildAuthzOptions(authorizationJSON, serverConfig.baseUrl, options.timeout, realmPath, serverConfig.paths);
                        url = new URL(authzOptions.url);
                        type = url.searchParams.get('authIndexType');
                        tree = url.searchParams.get('authIndexValue');
                        runMiddleware = middlewareWrapper({
                            url: new URL(authzOptions.url),
                            init: authzOptions.init,
                        }, {
                            type: ActionTypes.StartAuthenticate,
                            payload: { type: type, tree: tree },
                        });
                        _b = runMiddleware(middleware), authUrl = _b.url, authInit = _b.init;
                        authzOptions.url = authUrl.toString();
                        authzOptions.init = authInit;
                        return [4 /*yield*/, this._request(authzOptions, false)];
                    case 8:
                        initialStep = _c.sent();
                        return [4 /*yield*/, isAuthzStep(initialStep)];
                    case 9:
                        if (!(_c.sent())) {
                            throw new Error('Error: Initial response from auth server not a "step".');
                        }
                        if (!hasAuthzAdvice(authorizationJSON)) {
                            throw new Error("Error: Transactional or Service Advice is empty.");
                        }
                        // Walk through auth tree
                        return [4 /*yield*/, this.stepIterator(initialStep, options.authorization.handleStep, type, tree)];
                    case 10:
                        // Walk through auth tree
                        _c.sent();
                        tokens = void 0;
                        _c.label = 11;
                    case 11:
                        _c.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, TokenStorage.get()];
                    case 12:
                        tokens = _c.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        err_1 = _c.sent();
                        return [3 /*break*/, 14];
                    case 14:
                        if (hasIG) {
                            // Update URL with IDs and tokens for IG
                            options.url = addAuthzInfoToURL(options.url, authorizationJSON.advices, tokens);
                        }
                        else {
                            // Update headers with IDs and tokens for REST API
                            options.init.headers = addAuthzInfoToHeaders(options.init, authorizationJSON.advices, tokens);
                        }
                        return [4 /*yield*/, this._request(options, false)];
                    case 15:
                        // Retry original resource request
                        res = _c.sent();
                        _c.label = 16;
                    case 16: return [2 /*return*/, res];
                }
            });
        });
    };
    HttpClient.setAuthHeaders = function (headers, forceRenew) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TokenStorage.get()];
                    case 1:
                        tokens = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        if (!(tokens && tokens.accessToken)) return [3 /*break*/, 5];
                        return [4 /*yield*/, TokenManager.getTokens({ forceRenew: forceRenew })];
                    case 4:
                        // Access tokens are an OAuth artifact
                        tokens = _a.sent();
                        // TODO: Temp fix; refactor this in next txn auth story
                        if (tokens && tokens.accessToken) {
                            headers.set('Authorization', "Bearer ".concat(tokens.accessToken));
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, headers];
                }
            });
        });
    };
    HttpClient.stepIterator = function (res, handleStep, type, tree) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonRes, initialStep;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, res.json()];
                    case 1:
                        jsonRes = _a.sent();
                        initialStep = new FRStep(jsonRes);
                        // eslint-disable-next-line no-async-promise-executor
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                function handleNext(step) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var input, output;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, handleStep(step)];
                                                case 1:
                                                    input = _a.sent();
                                                    return [4 /*yield*/, FRAuth.next(input, { type: type, tree: tree })];
                                                case 2:
                                                    output = _a.sent();
                                                    if (output.type === StepType.LoginSuccess) {
                                                        resolve();
                                                    }
                                                    else if (output.type === StepType.LoginFailure) {
                                                        reject('Authentication tree failure.');
                                                    }
                                                    else {
                                                        handleNext(output);
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                                return __generator(this, function (_a) {
                                    handleNext(initialStep);
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    HttpClient._request = function (options, forceRenew) {
        return __awaiter(this, void 0, void 0, function () {
            var url, init, timeout, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = options.url, init = options.init, timeout = options.timeout;
                        headers = new Headers(init.headers || {});
                        if (!!options.bypassAuthentication) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setAuthHeaders(headers, forceRenew)];
                    case 1:
                        headers = _a.sent();
                        _a.label = 2;
                    case 2:
                        init.headers = headers;
                        return [2 /*return*/, withTimeout(fetch(url, init), timeout)];
                }
            });
        });
    };
    return HttpClient;
}(Dispatcher));
export default HttpClient;
//# sourceMappingURL=index.js.map