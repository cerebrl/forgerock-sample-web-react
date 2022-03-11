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
import { CallbackType } from '../auth/enums';
import { WebAuthnOutcome, WebAuthnOutcomeType, WebAuthnStepType } from './enums';
import { arrayBufferToString, parseCredentials, parsePubKeyArray, parseRelyingPartyId, } from './helpers';
import { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText } from './script-parser';
/**
 * Utility for integrating a web browser's WebAuthn API.
 *
 * Example:
 *
 * ```js
 * // Determine if a step is a WebAuthn step
 * const stepType = FRWebAuthn.getWebAuthnStepType(step);
 * if (stepType === WebAuthnStepType.Registration) {
 *   // Register a new device
 *   await FRWebAuthn.register(step);
 * } else if (stepType === WebAuthnStepType.Authentication) {
 *   // Authenticate with a registered device
 *   await FRWebAuthn.authenticate(step);
 * }
 * ```
 */
var FRWebAuthn = /** @class */ (function () {
    function FRWebAuthn() {
    }
    /**
     * Determines if the given step is a WebAuthn step.
     *
     * @param step The step to evaluate
     * @return A WebAuthnStepType value
     */
    FRWebAuthn.getWebAuthnStepType = function (step) {
        var outcomeCallback = this.getOutcomeCallback(step);
        var metadataCallback = this.getMetadataCallback(step);
        var textOutputCallback = this.getTextOutputCallback(step);
        if (outcomeCallback && metadataCallback) {
            var metadata = metadataCallback.getOutputValue('data');
            if (metadata === null || metadata === void 0 ? void 0 : metadata.pubKeyCredParams) {
                return WebAuthnStepType.Registration;
            }
            return WebAuthnStepType.Authentication;
        }
        else if (outcomeCallback && textOutputCallback) {
            var message = textOutputCallback.getMessage();
            if (message.includes('pubKeyCredParams')) {
                return WebAuthnStepType.Registration;
            }
            return WebAuthnStepType.Authentication;
        }
        else {
            return WebAuthnStepType.None;
        }
    };
    /**
     * Populates the step with the necessary authentication outcome.
     *
     * @param step The step that contains WebAuthn authentication data
     * @return The populated step
     */
    FRWebAuthn.authenticate = function (step) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hiddenCallback, metadataCallback, textOutputCallback, outcome, publicKey, meta, credential, error_1, e;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getCallbacks(step), hiddenCallback = _a.hiddenCallback, metadataCallback = _a.metadataCallback, textOutputCallback = _a.textOutputCallback;
                        if (!(hiddenCallback && (metadataCallback || textOutputCallback))) return [3 /*break*/, 5];
                        outcome = void 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        publicKey = void 0;
                        if (metadataCallback) {
                            meta = metadataCallback.getOutputValue('data');
                            publicKey = this.createAuthenticationPublicKey(meta);
                        }
                        else if (textOutputCallback) {
                            publicKey = parseWebAuthnAuthenticateText(textOutputCallback.getMessage());
                        }
                        return [4 /*yield*/, this.getAuthenticationCredential(publicKey)];
                    case 2:
                        credential = _b.sent();
                        outcome = this.getAuthenticationOutcome(credential);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (!(error_1 instanceof Error))
                            throw error_1;
                        // NotSupportedError is a special case
                        if (error_1.name === WebAuthnOutcomeType.NotSupportedError) {
                            hiddenCallback.setInputValue(WebAuthnOutcome.Unsupported);
                            throw error_1;
                        }
                        hiddenCallback.setInputValue("".concat(WebAuthnOutcome.Error, "::").concat(error_1.name, ":").concat(error_1.message));
                        throw error_1;
                    case 4:
                        hiddenCallback.setInputValue(outcome);
                        return [2 /*return*/, step];
                    case 5:
                        e = new Error('Incorrect callbacks for WebAuthn authentication');
                        e.name = WebAuthnOutcomeType.DataError;
                        hiddenCallback === null || hiddenCallback === void 0 ? void 0 : hiddenCallback.setInputValue("".concat(WebAuthnOutcome.Error, "::").concat(e.name, ":").concat(e.message));
                        throw e;
                }
            });
        });
    };
    /**
     * Populates the step with the necessary registration outcome.
     *
     * @param step The step that contains WebAuthn registration data
     * @return The populated step
     */
    FRWebAuthn.register = function (step) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hiddenCallback, metadataCallback, textOutputCallback, outcome, publicKey, meta, credential, error_2, e;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getCallbacks(step), hiddenCallback = _a.hiddenCallback, metadataCallback = _a.metadataCallback, textOutputCallback = _a.textOutputCallback;
                        if (!(hiddenCallback && (metadataCallback || textOutputCallback))) return [3 /*break*/, 5];
                        outcome = void 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        publicKey = void 0;
                        if (metadataCallback) {
                            meta = metadataCallback.getOutputValue('data');
                            publicKey = this.createRegistrationPublicKey(meta);
                        }
                        else if (textOutputCallback) {
                            publicKey = parseWebAuthnRegisterText(textOutputCallback.getMessage());
                        }
                        return [4 /*yield*/, this.getRegistrationCredential(publicKey)];
                    case 2:
                        credential = _b.sent();
                        outcome = this.getRegistrationOutcome(credential);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        if (!(error_2 instanceof Error))
                            throw error_2;
                        // NotSupportedError is a special case
                        if (error_2.name === WebAuthnOutcomeType.NotSupportedError) {
                            hiddenCallback.setInputValue(WebAuthnOutcome.Unsupported);
                            throw error_2;
                        }
                        hiddenCallback.setInputValue("".concat(WebAuthnOutcome.Error, "::").concat(error_2.name, ":").concat(error_2.message));
                        throw error_2;
                    case 4:
                        hiddenCallback.setInputValue(outcome);
                        return [2 /*return*/, step];
                    case 5:
                        e = new Error('Incorrect callbacks for WebAuthn registration');
                        e.name = WebAuthnOutcomeType.DataError;
                        hiddenCallback === null || hiddenCallback === void 0 ? void 0 : hiddenCallback.setInputValue("".concat(WebAuthnOutcome.Error, "::").concat(e.name, ":").concat(e.message));
                        throw e;
                }
            });
        });
    };
    /**
     * Returns an object containing the two WebAuthn callbacks.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The WebAuthn callbacks
     */
    FRWebAuthn.getCallbacks = function (step) {
        var hiddenCallback = this.getOutcomeCallback(step);
        var metadataCallback = this.getMetadataCallback(step);
        var textOutputCallback = this.getTextOutputCallback(step);
        var returnObj = {
            hiddenCallback: hiddenCallback,
        };
        if (metadataCallback) {
            returnObj.metadataCallback = metadataCallback;
        }
        else if (textOutputCallback) {
            returnObj.textOutputCallback = textOutputCallback;
        }
        return returnObj;
    };
    /**
     * Returns the WebAuthn metadata callback containing data to pass to the browser
     * Web Authentication API.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The metadata callback
     */
    FRWebAuthn.getMetadataCallback = function (step) {
        return step.getCallbacksOfType(CallbackType.MetadataCallback).find(function (x) {
            var cb = x.getOutputByName('data', undefined);
            // eslint-disable-next-line no-prototype-builtins
            return cb && cb.hasOwnProperty('relyingPartyId');
        });
    };
    /**
     * Returns the WebAuthn hidden value callback where the outcome should be populated.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The hidden value callback
     */
    FRWebAuthn.getOutcomeCallback = function (step) {
        return step
            .getCallbacksOfType(CallbackType.HiddenValueCallback)
            .find(function (x) { return x.getOutputByName('id', '') === 'webAuthnOutcome'; });
    };
    /**
     * Returns the WebAuthn metadata callback containing data to pass to the browser
     * Web Authentication API.
     *
     * @param step The step that contains WebAuthn callbacks
     * @return The metadata callback
     */
    FRWebAuthn.getTextOutputCallback = function (step) {
        return step
            .getCallbacksOfType(CallbackType.TextOutputCallback)
            .find(function (x) {
            var cb = x.getOutputByName('message', undefined);
            return cb && cb.includes('webAuthnOutcome');
        });
    };
    /**
     * Retrieves the credential from the browser Web Authentication API.
     *
     * @param options The public key options associated with the request
     * @return The credential
     */
    FRWebAuthn.getAuthenticationCredential = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var e, credential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Feature check before we attempt registering a device
                        if (!window.PublicKeyCredential) {
                            e = new Error('PublicKeyCredential not supported by this browser');
                            e.name = WebAuthnOutcomeType.NotSupportedError;
                            throw e;
                        }
                        return [4 /*yield*/, navigator.credentials.get({ publicKey: options })];
                    case 1:
                        credential = _a.sent();
                        return [2 /*return*/, credential];
                }
            });
        });
    };
    /**
     * Converts an authentication credential into the outcome expected by OpenAM.
     *
     * @param credential The credential to convert
     * @return The outcome string
     */
    FRWebAuthn.getAuthenticationOutcome = function (credential) {
        if (credential === null) {
            var e = new Error('No credential generated from authentication');
            e.name = WebAuthnOutcomeType.UnknownError;
            throw e;
        }
        try {
            var clientDataJSON = arrayBufferToString(credential.response.clientDataJSON);
            var assertionResponse = credential.response;
            var authenticatorData = new Int8Array(assertionResponse.authenticatorData).toString();
            var signature = new Int8Array(assertionResponse.signature).toString();
            // Current native typing for PublicKeyCredential does not include `userHandle`
            // eslint-disable-next-line
            // @ts-ignore
            var userHandle = arrayBufferToString(credential.response.userHandle);
            var stringOutput = "".concat(clientDataJSON, "::").concat(authenticatorData, "::").concat(signature, "::").concat(credential.id);
            // Check if Username is stored on device
            if (userHandle) {
                stringOutput = "".concat(stringOutput, "::").concat(userHandle);
            }
            return stringOutput;
        }
        catch (error) {
            var e = new Error('Transforming credential object to string failed');
            e.name = WebAuthnOutcomeType.EncodingError;
            throw e;
        }
    };
    /**
     * Retrieves the credential from the browser Web Authentication API.
     *
     * @param options The public key options associated with the request
     * @return The credential
     */
    FRWebAuthn.getRegistrationCredential = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var e, credential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Feature check before we attempt registering a device
                        if (!window.PublicKeyCredential) {
                            e = new Error('PublicKeyCredential not supported by this browser');
                            e.name = WebAuthnOutcomeType.NotSupportedError;
                            throw e;
                        }
                        return [4 /*yield*/, navigator.credentials.create({ publicKey: options })];
                    case 1:
                        credential = _a.sent();
                        return [2 /*return*/, credential];
                }
            });
        });
    };
    /**
     * Converts a registration credential into the outcome expected by OpenAM.
     *
     * @param credential The credential to convert
     * @return The outcome string
     */
    FRWebAuthn.getRegistrationOutcome = function (credential) {
        if (credential === null) {
            var e = new Error('No credential generated from registration');
            e.name = WebAuthnOutcomeType.UnknownError;
            throw e;
        }
        try {
            var clientDataJSON = arrayBufferToString(credential.response.clientDataJSON);
            var attestationResponse = credential.response;
            var attestationObject = new Int8Array(attestationResponse.attestationObject).toString();
            return "".concat(clientDataJSON, "::").concat(attestationObject, "::").concat(credential.id);
        }
        catch (error) {
            var e = new Error('Transforming credential object to string failed');
            e.name = WebAuthnOutcomeType.EncodingError;
            throw e;
        }
    };
    /**
     * Converts authentication tree metadata into options required by the browser
     * Web Authentication API.
     *
     * @param metadata The metadata provided in the authentication tree MetadataCallback
     * @return The Web Authentication API request options
     */
    FRWebAuthn.createAuthenticationPublicKey = function (metadata) {
        var acceptableCredentials = metadata.acceptableCredentials, allowCredentials = metadata.allowCredentials, challenge = metadata.challenge, relyingPartyId = metadata.relyingPartyId, timeout = metadata.timeout, userVerification = metadata.userVerification;
        var rpId = parseRelyingPartyId(relyingPartyId);
        var allowCredentialsValue = parseCredentials(allowCredentials || acceptableCredentials || '');
        return __assign(__assign(__assign({ challenge: Uint8Array.from(atob(challenge), function (c) { return c.charCodeAt(0); }).buffer, timeout: timeout }, (allowCredentialsValue && { allowCredentials: allowCredentialsValue })), (userVerification && { userVerification: userVerification })), (rpId && { rpId: rpId }));
    };
    /**
     * Converts authentication tree metadata into options required by the browser
     * Web Authentication API.
     *
     * @param metadata The metadata provided in the authentication tree MetadataCallback
     * @return The Web Authentication API request options
     */
    FRWebAuthn.createRegistrationPublicKey = function (metadata) {
        var pubKeyCredParamsString = metadata.pubKeyCredParams;
        var pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
        if (!pubKeyCredParams) {
            var e = new Error('Missing pubKeyCredParams property from registration options');
            e.name = WebAuthnOutcomeType.DataError;
            throw e;
        }
        var excludeCredentials = parseCredentials(metadata.excludeCredentials);
        var attestationPreference = metadata.attestationPreference, authenticatorSelection = metadata.authenticatorSelection, challenge = metadata.challenge, relyingPartyId = metadata.relyingPartyId, relyingPartyName = metadata.relyingPartyName, timeout = metadata.timeout, userId = metadata.userId, userName = metadata.userName, displayName = metadata.displayName;
        var rpId = parseRelyingPartyId(relyingPartyId);
        var rp = __assign({ name: relyingPartyName }, (rpId && { id: rpId }));
        return __assign(__assign({ attestation: attestationPreference, authenticatorSelection: JSON.parse(authenticatorSelection), challenge: Uint8Array.from(atob(challenge), function (c) { return c.charCodeAt(0); }).buffer }, (excludeCredentials.length && { excludeCredentials: excludeCredentials })), { pubKeyCredParams: pubKeyCredParams, rp: rp, timeout: timeout, user: {
                displayName: displayName || userName,
                id: Int8Array.from(userId.split('').map(function (c) { return c.charCodeAt(0); })),
                name: userName,
            } });
    };
    return FRWebAuthn;
}());
export default FRWebAuthn;
export { WebAuthnOutcome, WebAuthnStepType, };
//# sourceMappingURL=index.js.map