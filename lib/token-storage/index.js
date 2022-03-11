/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
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
import Config from '../config/index';
import IndexedDBWrapper from './indexed-db';
import LocalStorageWrapper from './local-storage';
import SessionStorageWrapper from './session-storage';
/**
 * Provides access to the token storage API.
 * The type of storage (localStorage, sessionStorage, etc) can be configured
 * through `tokenStore` object on the SDK configuration.
 */
var TokenStorage = /** @class */ (function () {
    function TokenStorage() {
    }
    /**
     * Gets stored tokens.
     */
    TokenStorage.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, tokenStore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getClientConfig(), clientId = _a.clientId, tokenStore = _a.tokenStore;
                        if (!(tokenStore === 'sessionStorage')) return [3 /*break*/, 2];
                        return [4 /*yield*/, SessionStorageWrapper.get(clientId)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        if (!(tokenStore === 'localStorage')) return [3 /*break*/, 4];
                        return [4 /*yield*/, LocalStorageWrapper.get(clientId)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(tokenStore === 'indexedDB')) return [3 /*break*/, 6];
                        return [4 /*yield*/, IndexedDBWrapper.get(clientId)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        if (!(tokenStore && tokenStore.get)) return [3 /*break*/, 8];
                        return [4 /*yield*/, tokenStore.get(clientId)];
                    case 7: 
                    // User supplied token store
                    return [2 /*return*/, _b.sent()];
                    case 8: return [4 /*yield*/, LocalStorageWrapper.get(clientId)];
                    case 9: 
                    // if tokenStore is undefined, default to localStorage
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * Saves tokens.
     */
    TokenStorage.set = function (tokens) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, tokenStore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getClientConfig(), clientId = _a.clientId, tokenStore = _a.tokenStore;
                        if (!(tokenStore === 'sessionStorage')) return [3 /*break*/, 2];
                        return [4 /*yield*/, SessionStorageWrapper.set(clientId, tokens)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        if (!(tokenStore === 'localStorage')) return [3 /*break*/, 4];
                        return [4 /*yield*/, LocalStorageWrapper.set(clientId, tokens)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(tokenStore === 'indexedDB')) return [3 /*break*/, 6];
                        return [4 /*yield*/, IndexedDBWrapper.set(clientId, tokens)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        if (!(tokenStore && tokenStore.set)) return [3 /*break*/, 8];
                        return [4 /*yield*/, tokenStore.set(clientId, tokens)];
                    case 7: 
                    // User supplied token store
                    return [2 /*return*/, _b.sent()];
                    case 8: return [4 /*yield*/, LocalStorageWrapper.set(clientId, tokens)];
                    case 9: 
                    // if tokenStore is undefined, default to localStorage
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    /**
     * Removes stored tokens.
     */
    TokenStorage.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clientId, tokenStore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getClientConfig(), clientId = _a.clientId, tokenStore = _a.tokenStore;
                        if (!(tokenStore === 'sessionStorage')) return [3 /*break*/, 2];
                        return [4 /*yield*/, SessionStorageWrapper.remove(clientId)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        if (!(tokenStore === 'localStorage')) return [3 /*break*/, 4];
                        return [4 /*yield*/, LocalStorageWrapper.remove(clientId)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4:
                        if (!(tokenStore === 'indexedDB')) return [3 /*break*/, 6];
                        return [4 /*yield*/, IndexedDBWrapper.remove(clientId)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        if (!(tokenStore && tokenStore.remove)) return [3 /*break*/, 8];
                        return [4 /*yield*/, tokenStore.remove(clientId)];
                    case 7: 
                    // User supplied token store
                    return [2 /*return*/, _b.sent()];
                    case 8: return [4 /*yield*/, LocalStorageWrapper.remove(clientId)];
                    case 9: 
                    // if tokenStore is undefined, default to localStorage
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    TokenStorage.getClientConfig = function () {
        var _a = Config.get(), clientId = _a.clientId, tokenStore = _a.tokenStore;
        if (!clientId) {
            throw new Error('clientId is required to manage token storage');
        }
        return { clientId: clientId, tokenStore: tokenStore };
    };
    return TokenStorage;
}());
export default TokenStorage;
//# sourceMappingURL=index.js.map