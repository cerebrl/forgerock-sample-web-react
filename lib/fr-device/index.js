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
import { browserProps, configurableCategories, delay, devicePlatforms, displayProps, fontNames, hardwareProps, platformProps, } from './defaults';
import Collector from './collector';
/**
 * @class FRDevice - Collects user device metadata
 *
 * Example:
 *
 * ```js
 * // Instantiate new device object (w/optional config, if needed)
 * const device = new forgerock.FRDevice(
 *   // optional configuration
 * );
 * // override any instance methods, if needed
 * // e.g.: device.getDisplayMeta = () => {};
 *
 * // Call getProfile with required argument obj of boolean properties
 * // of location and metadata
 * const profile = await device.getProfile({
 *   location: isLocationRequired,
 *   metadata: isMetadataRequired,
 * });
 * ```
 */
var FRDevice = /** @class */ (function (_super) {
    __extends(FRDevice, _super);
    function FRDevice(config) {
        var _this = _super.call(this) || this;
        _this.config = {
            fontNames: fontNames,
            devicePlatforms: devicePlatforms,
            displayProps: displayProps,
            browserProps: browserProps,
            hardwareProps: hardwareProps,
            platformProps: platformProps,
        };
        if (config) {
            Object.keys(config).forEach(function (key) {
                if (!configurableCategories.includes(key)) {
                    throw new Error('Device profile configuration category does not exist.');
                }
                _this.config[key] = config[key];
            });
        }
        return _this;
    }
    FRDevice.prototype.getBrowserMeta = function () {
        if (!navigator) {
            console.warn('Cannot collect browser metadata. navigator is not defined.');
            return {};
        }
        return this.reduceToObject(this.config.browserProps, navigator);
    };
    FRDevice.prototype.getBrowserPluginsNames = function () {
        if (!(navigator && navigator.plugins)) {
            console.warn('Cannot collect browser plugin information. navigator.plugins is not defined.');
            return '';
        }
        return this.reduceToString(Object.keys(navigator.plugins), navigator.plugins);
    };
    FRDevice.prototype.getDeviceName = function () {
        if (!navigator) {
            console.warn('Cannot collect device name. navigator is not defined.');
            return '';
        }
        var userAgent = navigator.userAgent;
        var platform = navigator.platform;
        switch (true) {
            case this.config.devicePlatforms.mac.includes(platform):
                return 'Mac (Browser)';
            case this.config.devicePlatforms.ios.includes(platform):
                return "".concat(platform, " (Browser)");
            case this.config.devicePlatforms.windows.includes(platform):
                return 'Windows (Browser)';
            case /Android/.test(platform) || /Android/.test(userAgent):
                return 'Android (Browser)';
            case /CrOS/.test(userAgent) || /Chromebook/.test(userAgent):
                return 'Chrome OS (Browser)';
            case /Linux/.test(platform):
                return 'Linux (Browser)';
            default:
                return "".concat(platform || 'Unknown', " (Browser)");
        }
    };
    FRDevice.prototype.getDisplayMeta = function () {
        if (!screen) {
            console.warn('Cannot collect screen information. screen is not defined.');
        }
        return this.reduceToObject(this.config.displayProps, screen);
    };
    FRDevice.prototype.getHardwareMeta = function () {
        if (!navigator) {
            console.warn('Cannot collect OS metadata. Navigator is not defined.');
            return {};
        }
        return this.reduceToObject(this.config.hardwareProps, navigator);
    };
    FRDevice.prototype.getIdentifier = function () {
        if (!(window.crypto && window.crypto.getRandomValues)) {
            console.warn('Cannot generate profile ID. Crypto and/or getRandomValues is not supported.');
            return '';
        }
        if (!localStorage) {
            console.warn('Cannot store profile ID. localStorage is not supported.');
            return '';
        }
        var id = localStorage.getItem('profile-id');
        if (!id) {
            // generate ID, 3 sections of random numbers: "714524572-2799534390-3707617532"
            id = window.crypto.getRandomValues(new Uint32Array(3)).join('-');
            localStorage.setItem('profile-id', id);
        }
        return id;
    };
    FRDevice.prototype.getInstalledFonts = function () {
        var canvas = document.createElement('canvas');
        if (!canvas) {
            console.warn('Cannot collect font data. Browser does not support canvas element');
            return '';
        }
        var context = canvas.getContext && canvas.getContext('2d');
        if (!context) {
            console.warn('Cannot collect font data. Browser does not support 2d canvas context');
            return '';
        }
        var text = 'abcdefghi0123456789';
        context.font = '72px Comic Sans';
        var baseWidth = context.measureText(text).width;
        var installedFonts = this.config.fontNames.reduce(function (prev, curr) {
            context.font = "72px ".concat(curr, ", Comic Sans");
            var newWidth = context.measureText(text).width;
            if (newWidth !== baseWidth) {
                prev = "".concat(prev).concat(curr, ";");
            }
            return prev;
        }, '');
        return installedFonts;
    };
    FRDevice.prototype.getLocationCoordinates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!(navigator && navigator.geolocation)) {
                    console.warn('Cannot collect geolocation information. navigator.geolocation is not defined.');
                    return [2 /*return*/, Promise.resolve({})];
                }
                // eslint-disable-next-line no-async-promise-executor
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                return resolve({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                });
                            }, function (error) {
                                console.warn('Cannot collect geolocation information. ' + error.code + ': ' + error.message);
                                resolve({});
                            }, {
                                enableHighAccuracy: true,
                                timeout: delay,
                                maximumAge: 0,
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    FRDevice.prototype.getOSMeta = function () {
        if (!navigator) {
            console.warn('Cannot collect OS metadata. navigator is not defined.');
            return {};
        }
        return this.reduceToObject(this.config.platformProps, navigator);
    };
    FRDevice.prototype.getProfile = function (_a) {
        var location = _a.location, metadata = _a.metadata;
        return __awaiter(this, void 0, void 0, function () {
            var profile, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        profile = {
                            identifier: this.getIdentifier(),
                        };
                        if (metadata) {
                            profile.metadata = {
                                hardware: __assign(__assign({}, this.getHardwareMeta()), { display: this.getDisplayMeta() }),
                                browser: __assign(__assign({}, this.getBrowserMeta()), { plugins: this.getBrowserPluginsNames() }),
                                platform: __assign(__assign({}, this.getOSMeta()), { deviceName: this.getDeviceName(), fonts: this.getInstalledFonts(), timezone: this.getTimezoneOffset() }),
                            };
                        }
                        if (!location) return [3 /*break*/, 2];
                        _b = profile;
                        return [4 /*yield*/, this.getLocationCoordinates()];
                    case 1:
                        _b.location = _c.sent();
                        _c.label = 2;
                    case 2: return [2 /*return*/, profile];
                }
            });
        });
    };
    FRDevice.prototype.getTimezoneOffset = function () {
        try {
            return new Date().getTimezoneOffset();
        }
        catch (err) {
            console.warn('Cannot collect timezone information. getTimezoneOffset is not defined.');
            return null;
        }
    };
    return FRDevice;
}(Collector));
export default FRDevice;
//# sourceMappingURL=index.js.map