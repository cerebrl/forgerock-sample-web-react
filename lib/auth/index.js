/*
 * @forgerock/javascript-sdk
 *
 * index.ts
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
import { REQUESTED_WITH } from '../shared/constants';
import { withTimeout } from '../util/timeout';
import { getEndpointPath, resolve, stringify } from '../util/url';
import middlewareWrapper from '../util/middleware';
/**
 * Provides direct access to the OpenAM authentication tree API.
 */
var Auth = /** @class */ (function () {
    function Auth() {
    }
    /**
     * Gets the next step in the authentication tree.
     *
     * @param {Step} previousStep The previous step, including any required input.
     * @param {StepOptions} options Configuration default overrides.
     * @return {Step} The next step in the authentication tree.
     */
    Auth.next = function (previousStep, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, middleware, realmPath, serverConfig, tree, type, query, url, runMiddleware, req, res, json;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Config.get(options), middleware = _a.middleware, realmPath = _a.realmPath, serverConfig = _a.serverConfig, tree = _a.tree, type = _a.type;
                        query = options ? options.query : {};
                        url = this.constructUrl(serverConfig, realmPath, tree, query);
                        runMiddleware = middlewareWrapper({
                            url: new URL(url),
                            init: this.configureRequest(previousStep),
                        }, {
                            type: previousStep ? ActionTypes.Authenticate : ActionTypes.StartAuthenticate,
                            payload: {
                                tree: tree,
                                type: type ? type : 'service',
                            },
                        });
                        req = runMiddleware(middleware);
                        return [4 /*yield*/, withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout)];
                    case 1:
                        res = _b.sent();
                        return [4 /*yield*/, this.getResponseJson(res)];
                    case 2:
                        json = _b.sent();
                        return [2 /*return*/, json];
                }
            });
        });
    };
    Auth.constructUrl = function (serverConfig, realmPath, tree, query) {
        var treeParams = tree ? { authIndexType: 'service', authIndexValue: tree } : undefined;
        var params = __assign(__assign({}, query), treeParams);
        var queryString = Object.keys(params).length > 0 ? "?".concat(stringify(params)) : '';
        var path = getEndpointPath('authenticate', realmPath, serverConfig.paths);
        var url = resolve(serverConfig.baseUrl, "".concat(path).concat(queryString));
        return url;
    };
    Auth.configureRequest = function (step) {
        var _a;
        var serverConfig = Config.get().serverConfig;
        var sessionCookieName = serverConfig.sessionCookieName || 'iPlanetDirectoryPro';
        var sessionCookieValue = window.localStorage.getItem(sessionCookieName) || '';
        var init = {
            body: step ? JSON.stringify(step) : undefined,
            credentials: 'include',
            headers: new Headers((_a = {},
                _a[sessionCookieName] = sessionCookieValue,
                _a.accept = 'application/json',
                _a['accept-api-version'] = 'protocol=1.0,resource=2.1',
                _a['content-type'] = 'application/json',
                _a['x-requested-with'] = REQUESTED_WITH,
                _a)),
            method: 'POST',
        };
        return init;
    };
    Auth.getResponseJson = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, isJson, json, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentType = res.headers.get('content-type');
                        isJson = contentType && contentType.indexOf('application/json') > -1;
                        if (!isJson) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.json()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = {};
                        _b.label = 3;
                    case 3:
                        json = _a;
                        json.status = res.status;
                        json.ok = res.ok;
                        return [2 /*return*/, json];
                }
            });
        });
    };
    return Auth;
}());
export default Auth;
//# sourceMappingURL=index.js.map