/*
 * @forgerock/javascript-sdk
 *
 * local-storage.ts
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
import { DB_NAME } from './constants';
/**
 * Provides wrapper for tokens with localStorage.
 */
var LocalStorageWrapper = /** @class */ (function () {
    function LocalStorageWrapper() {
    }
    /**
     * Retrieve tokens.
     */
    LocalStorageWrapper.get = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenString;
            return __generator(this, function (_a) {
                tokenString = localStorage.getItem("".concat(DB_NAME, "-").concat(clientId));
                try {
                    return [2 /*return*/, Promise.resolve(JSON.parse(tokenString || ''))];
                }
                catch (err) {
                    console.warn('Could not parse token from localStorage. This could be due to accessing a removed token');
                    // Original behavior had an untyped return of undefined for no token
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Saves tokens.
     */
    LocalStorageWrapper.set = function (clientId, tokens) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenString;
            return __generator(this, function (_a) {
                tokenString = JSON.stringify(tokens);
                localStorage.setItem("".concat(DB_NAME, "-").concat(clientId), tokenString);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Removes stored tokens.
     */
    LocalStorageWrapper.remove = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage.removeItem("".concat(DB_NAME, "-").concat(clientId));
                return [2 /*return*/];
            });
        });
    };
    return LocalStorageWrapper;
}());
export default LocalStorageWrapper;
//# sourceMappingURL=local-storage.js.map