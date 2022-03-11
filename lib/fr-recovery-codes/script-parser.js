/*
 * @forgerock/javascript-sdk
 *
 * script-parser.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
function parseDisplayRecoveryCodesText(text) {
    /**
     * e.g. ` ...
     *    "<div class=\"text-center\">\n" +
     *    "iZmEtxvQ00\n" +
     *    "</div>\n" +
     * ... `
     */
    var recoveryCodesMatches = text.match(/\s[\w\W]"([\w]*)\\/g);
    var recoveryCodes = Array.isArray(recoveryCodesMatches) &&
        recoveryCodesMatches.map(function (substr) {
            // e.g. `"iZmEtxvQ00\`
            var arr = substr.match(/"([\w]*)\\/);
            return Array.isArray(arr) ? arr[1] : '';
        });
    return recoveryCodes || [];
}
export { parseDisplayRecoveryCodesText };
//# sourceMappingURL=script-parser.js.map