/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/** @hidden */
function add(container, type, listener) {
    container[type] = container[type] || [];
    if (container[type].indexOf(listener) < 0) {
        container[type].push(listener);
    }
}
/** @hidden */
function remove(container, type, listener) {
    if (!container[type]) {
        return;
    }
    var index = container[type].indexOf(listener);
    if (index >= 0) {
        container[type].splice(index, 1);
    }
}
/** @hidden */
function clear(container, type) {
    Object.keys(container).forEach(function (k) {
        if (!type || k === type) {
            delete container[k];
        }
    });
}
export { add, clear, remove };
//# sourceMappingURL=helpers.js.map