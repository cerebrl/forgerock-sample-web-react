/*
 * @forgerock/javascript-sdk
 *
 * pkce.ts
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
/**
 * Helper class for generating verifier, challenge and state strings used for
 * Proof Key for Code Exchange (PKCE).
 */
var PKCE = /** @class */ (function () {
    function PKCE() {
    }
    /**
     * Creates a random state.
     */
    PKCE.createState = function () {
        return this.createRandomString(16);
    };
    /**
     * Creates a random verifier.
     */
    PKCE.createVerifier = function () {
        return this.createRandomString(32);
    };
    /**
     * Creates a SHA-256 hash of the verifier.
     *
     * @param verifier The verifier to hash
     */
    PKCE.createChallenge = function (verifier) {
        return __awaiter(this, void 0, void 0, function () {
            var sha256, challenge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sha256(verifier)];
                    case 1:
                        sha256 = _a.sent();
                        challenge = this.base64UrlEncode(sha256);
                        return [2 /*return*/, challenge];
                }
            });
        });
    };
    /**
     * Creates a base64 encoded, URL-friendly version of the specified array.
     *
     * @param array The array of numbers to encode
     */
    PKCE.base64UrlEncode = function (array) {
        var numbers = Array.prototype.slice.call(array);
        var ascii = window.btoa(String.fromCharCode.apply(null, numbers));
        var urlEncoded = ascii.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        return urlEncoded;
    };
    /**
     * Creates a SHA-256 hash of the specified string.
     *
     * @param value The string to hash
     */
    PKCE.sha256 = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var uint8Array, hashBuffer, hashArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uint8Array = new TextEncoder().encode(value);
                        return [4 /*yield*/, window.crypto.subtle.digest('SHA-256', uint8Array)];
                    case 1:
                        hashBuffer = _a.sent();
                        hashArray = new Uint8Array(hashBuffer);
                        return [2 /*return*/, hashArray];
                }
            });
        });
    };
    /**
     * Creates a random string.
     *
     * @param size The number for entropy (default: 32)
     */
    PKCE.createRandomString = function (num) {
        if (num === void 0) { num = 32; }
        var random = new Uint8Array(num);
        window.crypto.getRandomValues(random);
        return btoa(random.join('')).replace(/[^a-zA-Z0-9]+/, '');
    };
    return PKCE;
}());
export default PKCE;
//# sourceMappingURL=pkce.js.map