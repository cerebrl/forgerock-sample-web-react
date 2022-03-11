/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
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
import { getEndpointPath, resolve, stringify } from '../util/url';
export function addAuthzInfoToHeaders(init, advices, tokens) {
    var headers = new Headers(init.headers);
    if (advices.AuthenticateToServiceConditionAdvice) {
        headers.set('x-tree', advices.AuthenticateToServiceConditionAdvice[0]);
    }
    else if (advices.TransactionConditionAdvice) {
        headers.set('x-txid', advices.TransactionConditionAdvice[0]);
    }
    if (tokens && tokens.idToken) {
        headers.set('x-idtoken', tokens.idToken);
    }
    return headers;
}
export function addAuthzInfoToURL(url, advices, tokens) {
    var updatedURL = new URL(url);
    // Only modify URL for Transactional Authorization
    if (advices.TransactionConditionAdvice) {
        var txId = advices.TransactionConditionAdvice[0];
        // Add Txn ID to *original* request options as URL param
        updatedURL.searchParams.append('_txid', txId);
    }
    // If tokens are used, send idToken (OIDC)
    if (tokens && tokens.idToken) {
        updatedURL.searchParams.append('_idtoken', tokens.idToken);
    }
    // FYI: in certain circumstances, the URL may be returned unchanged
    return updatedURL.toString();
}
export function buildAuthzOptions(authzObj, baseURL, timeout, realmPath, customPaths) {
    var treeAuthAdvices = authzObj.advices && authzObj.advices.AuthenticateToServiceConditionAdvice;
    var txnAuthAdvices = authzObj.advices && authzObj.advices.TransactionConditionAdvice;
    var attributeValue = '';
    var attributeName = '';
    if (treeAuthAdvices) {
        attributeValue = treeAuthAdvices.reduce(function (prev, curr) {
            var prevWithSpace = prev ? " ".concat(prev) : prev;
            prev = "".concat(curr).concat(prevWithSpace);
            return prev;
        }, '');
        attributeName = 'AuthenticateToServiceConditionAdvice';
    }
    else if (txnAuthAdvices) {
        attributeValue = txnAuthAdvices.reduce(function (prev, curr) {
            var prevWithSpace = prev ? " ".concat(prev) : prev;
            prev = "".concat(curr).concat(prevWithSpace);
            return prev;
        }, '');
        attributeName = 'TransactionConditionAdvice';
    }
    var openTags = "<Advices><AttributeValuePair>";
    var nameTag = "<Attribute name=\"".concat(attributeName, "\"/>");
    var valueTag = "<Value>".concat(attributeValue, "</Value>");
    var endTags = "</AttributeValuePair></Advices>";
    var fullXML = "".concat(openTags).concat(nameTag).concat(valueTag).concat(endTags);
    var path = getEndpointPath('authenticate', realmPath, customPaths);
    var queryParams = {
        authIndexType: 'composite_advice',
        authIndexValue: fullXML,
    };
    var options = {
        init: {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Accept-API-Version': 'resource=2.0, protocol=1.0',
            }),
        },
        timeout: timeout,
        url: resolve(baseURL, "".concat(path, "?").concat(stringify(queryParams))),
    };
    return options;
}
export function examineForIGAuthz(res) {
    var type = res.headers.get('Content-Type') || '';
    return type.includes('html') && res.url.includes('composite_advice');
}
export function examineForRESTAuthz(res) {
    return __awaiter(this, void 0, void 0, function () {
        var clone, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clone = res.clone();
                    return [4 /*yield*/, clone.json()];
                case 1:
                    json = _a.sent();
                    return [2 /*return*/, !!json.advices];
            }
        });
    });
}
function getXMLValueFromURL(urlString) {
    var url = new URL(urlString);
    var value = url.searchParams.get('authIndexValue') || '';
    var parser = new DOMParser();
    var decodedValue = decodeURIComponent(value);
    var doc = parser.parseFromString(decodedValue, 'application/xml');
    var el = doc.querySelector('Value');
    return el ? el.innerHTML : '';
}
export function hasAuthzAdvice(json) {
    if (json.advices && json.advices.AuthenticateToServiceConditionAdvice) {
        return (Array.isArray(json.advices.AuthenticateToServiceConditionAdvice) &&
            json.advices.AuthenticateToServiceConditionAdvice.length > 0);
    }
    else if (json.advices && json.advices.TransactionConditionAdvice) {
        return (Array.isArray(json.advices.TransactionConditionAdvice) &&
            json.advices.TransactionConditionAdvice.length > 0);
    }
    else {
        return false;
    }
}
export function isAuthzStep(res) {
    return __awaiter(this, void 0, void 0, function () {
        var clone, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clone = res.clone();
                    return [4 /*yield*/, clone.json()];
                case 1:
                    json = _a.sent();
                    return [2 /*return*/, !!json.callbacks];
            }
        });
    });
}
export function newTokenRequired(res, requiresNewToken) {
    if (typeof requiresNewToken === 'function') {
        return requiresNewToken(res);
    }
    return res.status === 401;
}
export function normalizeIGJSON(res) {
    var advices = {};
    if (res.url.includes('AuthenticateToServiceConditionAdvice')) {
        advices.AuthenticateToServiceConditionAdvice = [getXMLValueFromURL(res.url)];
    }
    else {
        advices.TransactionConditionAdvice = [getXMLValueFromURL(res.url)];
    }
    return {
        resource: '',
        actions: {},
        attributes: {},
        advices: advices,
        ttl: 0,
    };
}
export function normalizeRESTJSON(res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, res.json()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
//# sourceMappingURL=helpers.js.map