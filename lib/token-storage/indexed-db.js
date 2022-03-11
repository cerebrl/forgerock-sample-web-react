/*
 * @forgerock/javascript-sdk
 *
 * indexed-db.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
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
import { DB_NAME, TOKEN_KEY } from './constants';
/**
 * Provides wrapper for tokens with IndexedDB.
 */
var IndexedDBWrapper = /** @class */ (function () {
    function IndexedDBWrapper() {
    }
    /**
     * Retrieve tokens.
     */
    IndexedDBWrapper.get = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var onError = function () { return reject(); };
                        var openReq = window.indexedDB.open(DB_NAME);
                        openReq.onsuccess = function () {
                            if (!openReq.result.objectStoreNames.contains(clientId)) {
                                openReq.result.close();
                                return reject('Client ID not found');
                            }
                            var getReq = openReq.result
                                .transaction(clientId, 'readonly')
                                .objectStore(clientId)
                                .get(TOKEN_KEY);
                            getReq.onsuccess = function (event) {
                                if (!event || !event.target) {
                                    throw new Error('Missing storage event target');
                                }
                                openReq.result.close();
                                resolve(event.target.result);
                            };
                            getReq.onerror = onError;
                        };
                        openReq.onupgradeneeded = function () {
                            openReq.result.close();
                            reject('IndexedDB upgrade needed');
                        };
                        openReq.onerror = onError;
                    })];
            });
        });
    };
    /**
     * Saves tokens.
     */
    IndexedDBWrapper.set = function (clientId, tokens) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var openReq = window.indexedDB.open(DB_NAME);
                        var onSetSuccess = function () {
                            openReq.result.close();
                            resolve();
                        };
                        var onError = function () { return reject(); };
                        var onUpgradeNeeded = function () {
                            openReq.result.createObjectStore(clientId);
                        };
                        var onOpenSuccess = function () {
                            if (!openReq.result.objectStoreNames.contains(clientId)) {
                                var version = openReq.result.version + 1;
                                openReq.result.close();
                                openReq = window.indexedDB.open(DB_NAME, version);
                                openReq.onupgradeneeded = onUpgradeNeeded;
                                openReq.onsuccess = onOpenSuccess;
                                openReq.onerror = onError;
                                return;
                            }
                            var txnReq = openReq.result.transaction(clientId, 'readwrite');
                            txnReq.onerror = onError;
                            var objectStore = txnReq.objectStore(clientId);
                            var putReq = objectStore.put(tokens, TOKEN_KEY);
                            putReq.onsuccess = onSetSuccess;
                            putReq.onerror = onError;
                        };
                        openReq.onupgradeneeded = onUpgradeNeeded;
                        openReq.onsuccess = onOpenSuccess;
                        openReq.onerror = onError;
                    })];
            });
        });
    };
    /**
     * Removes stored tokens.
     */
    IndexedDBWrapper.remove = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var onError = function () { return reject(); };
                        var openReq = window.indexedDB.open(DB_NAME);
                        openReq.onsuccess = function () {
                            if (!openReq.result.objectStoreNames.contains(clientId)) {
                                return resolve();
                            }
                            var removeReq = openReq.result
                                .transaction(clientId, 'readwrite')
                                .objectStore(clientId)
                                .delete(TOKEN_KEY);
                            removeReq.onsuccess = function () {
                                resolve();
                            };
                            removeReq.onerror = onError;
                        };
                        openReq.onerror = onError;
                    })];
            });
        });
    };
    return IndexedDBWrapper;
}());
export default IndexedDBWrapper;
//# sourceMappingURL=indexed-db.js.map