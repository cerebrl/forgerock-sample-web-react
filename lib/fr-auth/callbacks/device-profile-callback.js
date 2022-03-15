/*
 * @forgerock/javascript-sdk
 *
 * device-profile-callback.ts
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
import FRCallback from '.';
/**
 * Represents a callback used to collect device profile data.
 */
var DeviceProfileCallback = /** @class */ (function (_super) {
    __extends(DeviceProfileCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function DeviceProfileCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback's data.
     */
    DeviceProfileCallback.prototype.getMessage = function () {
        return this.getOutputByName('message', '');
    };
    /**
     * Does callback require metadata?
     */
    DeviceProfileCallback.prototype.isMetadataRequired = function () {
        return this.getOutputByName('metadata', false);
    };
    /**
     * Does callback require location data?
     */
    DeviceProfileCallback.prototype.isLocationRequired = function () {
        return this.getOutputByName('location', false);
    };
    /**
     * Sets the profile.
     */
    DeviceProfileCallback.prototype.setProfile = function (profile) {
        this.setInputValue(JSON.stringify(profile));
    };
    return DeviceProfileCallback;
}(FRCallback));
export default DeviceProfileCallback;
//# sourceMappingURL=device-profile-callback.js.map