/*
 * @forgerock/javascript-sdk
 *
 * strings.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @module
 * @ignore
 * These are private utility functions
 */
export function plural(n, singularText, pluralText) {
    if (n === 1) {
        return singularText;
    }
    return pluralText !== undefined ? pluralText : singularText + 's';
}
//# sourceMappingURL=strings.js.map