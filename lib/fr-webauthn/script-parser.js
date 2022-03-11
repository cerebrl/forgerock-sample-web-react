/* eslint-disable no-useless-escape */
/*
 * @forgerock/javascript-sdk
 *
 * script-parser.ts
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
import { WebAuthnOutcomeType } from './enums';
import { ensureArray, getIndexOne, parsePubKeyArray, parseCredentials } from './helpers';
function parseWebAuthnRegisterText(text) {
    var txtEncoder = new TextEncoder();
    // TODO: Incrementally move to `*` instead of `{0,}`
    // e.g. `attestation: "none"`
    var attestation = getIndexOne(text.match(/attestation"{0,}:\s{0,}"(\w+)"/));
    // e.g. `timeout: 60000`
    var timeout = Number(getIndexOne(text.match(/timeout"{0,}:\s{0,}(\d+)/)));
    // e.g. from 7.0: `"userVerification":"preferred"`
    // e.g. from 6.5: `userVerification: "preferred"`
    var userVerification = getIndexOne(text.match(/userVerification"{0,}:\s{0,}"(\w+)"/));
    // e.g. `"requireResidentKey":true`
    var requireResidentKey = getIndexOne(text.match(/requireResidentKey"{0,}:\s{0,}(\w+)/));
    // e.g. `"authenticatorAttachment":"cross-platform"`
    var authenticatorAttachment = getIndexOne(text.match(/authenticatorAttachment"{0,}:\s{0,}"([\w-]+)/));
    // e.g. `rp: {\n id: \"https://user.example.com:3002\",\n name: \"ForgeRock\"\n }`
    var rp = getIndexOne(text.match(/rp"{0,}:\s{0,}{([^}]+)}/)).trim();
    // e.g. `id: \"example.com\"
    var rpId = getIndexOne(rp.match(/id"{0,}:\s{0,}"([^"]*)"/));
    // e.g. `name: \"ForgeRock\"`
    var rpName = getIndexOne(rp.match(/name"{0,}:\s{0,}"([^"]*)"/));
    // e.g. `user: {\n id: Uint8Array.from(\"NTdhN...RiNjI5\",
    // function (c) { return c.charCodeAt(0) }),\n
    // name: \"57a5b4e4-...-a4f2e5d4b629\",\n
    // displayName: \"57a5b4e4-...-a4f2e5d4b629\"\n }`
    var user = getIndexOne(text.match(/user"{0,}:\s{0,}{([^]{0,})},/)).trim();
    // e.g `id: Uint8Array.from(\"NTdhN...RiNjI5\",`
    var userId = getIndexOne(user.match(/id"{0,}:\s{0,}Uint8Array.from\("([^"]+)"/));
    // e.g. `name: \"57a5b4e4-...-a4f2e5d4b629\",`
    var userName = getIndexOne(user.match(/name"{0,}:\s{0,}"([\d\w._-]+)"/));
    // e.g. `displayName: \"57a5b4e4-...-a4f2e5d4b629\"`
    var userDisplayName = getIndexOne(user.match(/displayName"{0,}:\s{0,}"([\d\w\s.@_-]+)"/));
    // e.g. `pubKeyCredParams: [
    // { \"type\": \"public-key\", \"alg\": -257 }, { \"type\": \"public-key\", \"alg\": -7 }
    // ]`
    var pubKeyCredParamsString = getIndexOne(
    // Capture the `pubKeyCredParams` without also matching `excludeCredentials` as well.
    // `excludeCredentials` values are very similar to this property, so we need to make sure
    // our last value doesn't end with "buffer", so we are only capturing objects that
    // end in a digit and possibly a space.
    text.match(/pubKeyCredParams"*:\s*\[([^]+\d\s*})\s*]/)).trim();
    // e.g. `{ \"type\": \"public-key\", \"alg\": -257 }, { \"type\": \"public-key\", \"alg\": -7 }`
    var pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
    if (!pubKeyCredParams) {
        var e = new Error('Missing pubKeyCredParams property from registration options');
        e.name = WebAuthnOutcomeType.DataError;
        throw e;
    }
    // e.g. `excludeCredentials: [{
    // \"type\": \"public-key\", \"id\": new Int8Array([-18, 69, -99, 82, 38, -66]).buffer },
    // { \"type\": \"public-key\", \"id\": new Int8Array([64, 17, -15, 56, -32, 91]).buffer }],\n`
    var excludeCredentialsString = getIndexOne(text.match(/excludeCredentials"{0,}:\s{0,}\[([^]+)\s{0,}]/)).trim();
    // e.g. `{ \"type\": \"public-key\", \"id\": new Int8Array([-18, 69, -99, 82, 38, -66]).buffer },
    // { \"type\": \"public-key\", \"id\": new Int8Array([64, 17, -15, 56, -32, 91]).buffer }`
    var excludeCredentials = parseCredentials(excludeCredentialsString);
    // e.g. `challenge: new Int8Array([87, -95, 18, ... -3,  49, 12, 81]).buffer,`
    var challengeArr = ensureArray(text.match(/challenge"{0,}:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
    // e.g. `[87, -95, 18, ... -3,  49, 12, 81]`
    var challengeJSON = JSON.parse(challengeArr[2]);
    // e.g. [87, -95, 18, ... -3,  49, 12, 81]
    var challenge = new Int8Array(challengeJSON).buffer;
    return __assign(__assign({ attestation: attestation, authenticatorSelection: __assign(__assign({ userVerification: userVerification }, (authenticatorAttachment && { authenticatorAttachment: authenticatorAttachment })), (requireResidentKey === 'true' && { requireResidentKey: !!requireResidentKey })), challenge: challenge }, (excludeCredentials.length && { excludeCredentials: excludeCredentials })), { pubKeyCredParams: pubKeyCredParams, rp: __assign({ name: rpName }, (rpId && { id: rpId })), timeout: timeout, user: {
            displayName: userDisplayName,
            id: txtEncoder.encode(userId),
            name: userName,
        } });
}
function parseWebAuthnAuthenticateText(text) {
    var allowCredentials;
    var allowCredentialsText;
    if (text.includes('acceptableCredentials')) {
        // e.g. `var acceptableCredentials = [
        //  { "type": "public-key", "id": new Int8Array([1, 97, 2, 123, ... -17]).buffer }
        // ];`
        allowCredentialsText = getIndexOne(text.match(/acceptableCredentials"*\s*=\s*\[([^]+)\s*]/)).trim();
    }
    else {
        // e.g. `allowCredentials: [
        // { \"type\": \"public-key\",
        // \"id\": new Int8Array([-107, 93, 68, -67, ... -19, 7, 4]).buffer }
        // ]`
        allowCredentialsText = getIndexOne(text.match(/allowCredentials"{0,}:\s{0,}\[([^]+)\s{0,}]/)).trim();
    }
    // e.g. `"userVerification":"preferred"`
    var userVerification = getIndexOne(text.match(/userVerification"{0,}:\s{0,}"(\w+)"/));
    if (allowCredentialsText) {
        // Splitting objects in array in case the user has multiple keys
        var allowCredentialArr = allowCredentialsText.split('},') || [allowCredentialsText];
        // Iterating over array of substrings
        allowCredentials = allowCredentialArr.map(function (str) {
            // e.g. `{ \"type\": \"public-key\",
            var type = getIndexOne(str.match(/type"{0,}:\s{0,}"([\w-]+)"/));
            // e.g. \"id\": new Int8Array([-107, 93, 68, -67, ... -19, 7, 4]).buffer
            var idArr = ensureArray(str.match(/id"{0,}:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
            // e.g. `[-107, 93, 68, -67, ... -19, 7, 4]`
            var idJSON = JSON.parse(idArr[2]);
            // e.g. [-107, 93, 68, -67, ... -19, 7, 4]
            var id = new Int8Array(idJSON).buffer;
            return {
                type: type,
                id: id,
            };
        });
    }
    // e.g. `timeout: 60000`
    var timeout = Number(getIndexOne(text.match(/timeout"{0,}:\s{0,}(\d+)/)));
    // e.g. `challenge: new Int8Array([87, -95, 18, ... -3,  49, 12, 81]).buffer,`
    var challengeArr = ensureArray(text.match(/challenge"{0,}:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
    // e.g. `[87, -95, 18, ... -3,  49, 12, 81]`
    var challengeJSON = JSON.parse(challengeArr[2]);
    // e.g. [87, -95, 18, ... -3,  49, 12, 81]
    var challenge = new Int8Array(challengeJSON).buffer;
    // e.g. `rpId: \"example.com\"`
    var rpId = getIndexOne(text.match(/rpId"{0,}:\s{0,}\\{0,}"([^"\\]*)/));
    return __assign(__assign(__assign({ challenge: challenge, timeout: timeout }, (allowCredentials && { allowCredentials: allowCredentials })), (userVerification && { userVerification: userVerification })), (rpId && { rpId: rpId }));
}
export { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText };
//# sourceMappingURL=script-parser.js.map