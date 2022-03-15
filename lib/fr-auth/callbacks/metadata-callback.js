/*
 * @forgerock/javascript-sdk
 *
 * metadata-callback.ts
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
 * Represents a callback used to deliver and collect miscellaneous data.
 */
var MetadataCallback = /** @class */ (function (_super) {
    __extends(MetadataCallback, _super);
    /**
     * @param payload The raw payload returned by OpenAM
     */
    function MetadataCallback(payload) {
        var _this = _super.call(this, payload) || this;
        _this.payload = payload;
        return _this;
    }
    /**
     * Gets the callback's data.
     */
    MetadataCallback.prototype.getData = function () {
        return this.getOutputByName('data', {});
    };
    return MetadataCallback;
}(FRCallback));
export default MetadataCallback;
//# sourceMappingURL=metadata-callback.js.map