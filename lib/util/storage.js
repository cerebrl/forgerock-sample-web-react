/*
 * @forgerock/javascript-sdk
 *
 * storage.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/** @hidden */
var LocalStorage = /** @class */ (function () {
    function LocalStorage(persist) {
        if (persist === void 0) { persist = false; }
        this.storage = persist ? window.localStorage : window.sessionStorage;
    }
    LocalStorage.prototype.get = function (key) {
        var value = this.storage.getItem(key);
        if (!value) {
            return undefined;
        }
        return JSON.parse(value);
    };
    LocalStorage.prototype.set = function (key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    };
    LocalStorage.prototype.remove = function (key) {
        this.storage.removeItem(key);
    };
    return LocalStorage;
}());
export default LocalStorage;
//# sourceMappingURL=storage.js.map