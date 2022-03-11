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
import { DEFAULT_TIMEOUT } from './constants';
/**
 * Utility for merging configuration defaults with one-off options.
 *
 * Example:
 *
 * ```js
 * // Establish configuration defaults
 * Config.set({
 *   clientId: 'myApp',
 *   serverConfig: { baseUrl: 'https://openam-domain.com/am' },
 *   tree: 'UsernamePassword'
 * });
 *
 * // Specify overrides as needed
 * const configOverrides = { tree: 'PasswordlessWebAuthn' };
 * const step = await FRAuth.next(undefined, configOverrides);
 */
var Config = /** @class */ (function () {
    function Config() {
    }
    /**
     * Sets the default options.
     *
     * @param options The options to use as defaults
     */
    Config.set = function (options) {
        if (!this.isValid(options)) {
            throw new Error('Configuration is invalid');
        }
        if (options.serverConfig) {
            this.validateServerConfig(options.serverConfig);
        }
        this.options = __assign({}, options);
    };
    /**
     * Merges the provided options with the default options.  Ensures a server configuration exists.
     *
     * @param options The options to merge with defaults
     */
    Config.get = function (options) {
        if (!this.options && !options) {
            throw new Error('Configuration has not been set');
        }
        var merged = __assign(__assign({}, this.options), options);
        if (!merged.serverConfig || !merged.serverConfig.baseUrl) {
            throw new Error('Server configuration has not been set');
        }
        return merged;
    };
    Config.isValid = function (options) {
        return !!(options && options.serverConfig);
    };
    Config.validateServerConfig = function (serverConfig) {
        if (!serverConfig.timeout) {
            serverConfig.timeout = DEFAULT_TIMEOUT;
        }
        var url = serverConfig.baseUrl;
        if (url && url.charAt(url.length - 1) !== '/') {
            serverConfig.baseUrl = url + '/';
        }
    };
    return Config;
}());
export default Config;
export { DEFAULT_TIMEOUT };
//# sourceMappingURL=index.js.map