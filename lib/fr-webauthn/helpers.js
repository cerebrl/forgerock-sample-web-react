/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
/**
 * @module
 * @ignore
 * These are private utility functions for HttpClient
 */
import { WebAuthnOutcomeType } from './enums';
function ensureArray(arr) {
    return arr || [];
}
function arrayBufferToString(arrayBuffer) {
    // https://goo.gl/yabPex - To future-proof, we'll pass along whatever the browser
    // gives us and let AM disregard randomly-injected properties
    var uint8Array = new Uint8Array(arrayBuffer);
    var txtDecoder = new TextDecoder();
    var json = txtDecoder.decode(uint8Array);
    return json;
}
function getIndexOne(arr) {
    return arr ? arr[1] : '';
}
// TODO: Remove this once AM is providing fully-serialized JSON
function parseCredentials(value) {
    try {
        var creds = value
            .split('}')
            .filter(function (x) { return !!x && x !== ']'; })
            .map(function (x) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            var idArray = parseNumberArray(x);
            return {
                id: new Int8Array(idArray).buffer,
                type: 'public-key',
            };
        });
        return creds;
    }
    catch (error) {
        var e = new Error('Transforming credential object to string failed');
        e.name = WebAuthnOutcomeType.EncodingError;
        throw e;
    }
}
function parseNumberArray(value) {
    var matches = /new Int8Array\((.+)\)/.exec(value);
    if (matches === null || matches.length < 2) {
        return [];
    }
    return JSON.parse(matches[1]);
}
function parsePubKeyArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value !== 'string') {
        return undefined;
    }
    if (value && value[0] === '[') {
        return JSON.parse(value);
    }
    value = value.replace(/(\w+):/g, '"$1":');
    return JSON.parse("[".concat(value, "]"));
}
function parseAllowCredentialsArray(value) {
    if (!value) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value !== 'string') {
        return undefined;
    }
    if (value && value[0] === '[') {
        return JSON.parse(value);
    }
    value = value.replace(/(\w+):/g, '"$1":');
    return JSON.parse("[".concat(value, "]"));
}
/**
 * AM is currently serializing RP as one of the following formats, depending on
 * whether RP ID has been configured:
 *   "relyingPartyId":""
 *   "relyingPartyId":"rpId: \"foo\","
 * This regex handles both formats, but should be removed once AM is fixed.
 */
function parseRelyingPartyId(relyingPartyId) {
    if (relyingPartyId.includes('rpId')) {
        return relyingPartyId.replace(/rpId: "(.+)",/, '$1');
    }
    else {
        return relyingPartyId.replace(/id: "(.+)",/, '$1');
    }
}
export { ensureArray, arrayBufferToString, getIndexOne, parseCredentials, parseNumberArray, parseAllowCredentialsArray, parsePubKeyArray, parseRelyingPartyId, };
//# sourceMappingURL=helpers.js.map