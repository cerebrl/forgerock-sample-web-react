/*
 * @forgerock/javascript-sdk
 *
 * deferred.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * Implementation of the Deferred API to simplify handling of Promises.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.reject = reject;
            _this.resolve = resolve;
        });
    }
    return Deferred;
}());
export default Deferred;
//# sourceMappingURL=deferred.js.map