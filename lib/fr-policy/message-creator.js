/*
 * @forgerock/javascript-sdk
 *
 * message-creator.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
var _a;
import { plural } from '../util/strings';
import { PolicyKey } from './enums';
import { getProp } from './helpers';
var defaultMessageCreator = (_a = {},
    _a[PolicyKey.CannotContainCharacters] = function (property, params) {
        var forbiddenChars = getProp(params, 'forbiddenChars', '');
        return "".concat(property, " must not contain following characters: \"").concat(forbiddenChars, "\"");
    },
    _a[PolicyKey.CannotContainDuplicates] = function (property, params) {
        var duplicateValue = getProp(params, 'duplicateValue', '');
        return "".concat(property, "  must not contain duplicates: \"").concat(duplicateValue, "\"");
    },
    _a[PolicyKey.CannotContainOthers] = function (property, params) {
        var disallowedFields = getProp(params, 'disallowedFields', '');
        return "".concat(property, " must not contain: \"").concat(disallowedFields, "\"");
    },
    _a[PolicyKey.LeastCapitalLetters] = function (property, params) {
        var numCaps = getProp(params, 'numCaps', 0);
        return "".concat(property, " must contain at least ").concat(numCaps, " capital ").concat(plural(numCaps, 'letter'));
    },
    _a[PolicyKey.LeastNumbers] = function (property, params) {
        var numNums = getProp(params, 'numNums', 0);
        return "".concat(property, " must contain at least ").concat(numNums, " numeric ").concat(plural(numNums, 'value'));
    },
    _a[PolicyKey.MatchRegexp] = function (property) { return "".concat(property, " has failed the \"MATCH_REGEXP\" policy"); },
    _a[PolicyKey.MaximumLength] = function (property, params) {
        var maxLength = getProp(params, 'maxLength', 0);
        return "".concat(property, " must be at most ").concat(maxLength, " ").concat(plural(maxLength, 'character'));
    },
    _a[PolicyKey.MaximumNumber] = function (property) {
        return "".concat(property, " has failed the \"MAXIMUM_NUMBER_VALUE\" policy");
    },
    _a[PolicyKey.MinimumLength] = function (property, params) {
        var minLength = getProp(params, 'minLength', 0);
        return "".concat(property, " must be at least ").concat(minLength, " ").concat(plural(minLength, 'character'));
    },
    _a[PolicyKey.MinimumNumber] = function (property) {
        return "".concat(property, " has failed the \"MINIMUM_NUMBER_VALUE\" policy");
    },
    _a[PolicyKey.Required] = function (property) { return "".concat(property, " is required"); },
    _a[PolicyKey.Unique] = function (property) { return "".concat(property, " must be unique"); },
    _a[PolicyKey.UnknownPolicy] = function (property, params) {
        var policyRequirement = getProp(params, 'policyRequirement', 'Unknown');
        return "".concat(property, ": Unknown policy requirement \"").concat(policyRequirement, "\"");
    },
    _a[PolicyKey.ValidArrayItems] = function (property) {
        return "".concat(property, " has failed the \"VALID_ARRAY_ITEMS\" policy");
    },
    _a[PolicyKey.ValidDate] = function (property) { return "".concat(property, " has an invalid date"); },
    _a[PolicyKey.ValidEmailAddress] = function (property) { return "".concat(property, " has an invalid email address"); },
    _a[PolicyKey.ValidNameFormat] = function (property) { return "".concat(property, " has an invalid name format"); },
    _a[PolicyKey.ValidNumber] = function (property) { return "".concat(property, " has an invalid number"); },
    _a[PolicyKey.ValidPhoneFormat] = function (property) { return "".concat(property, " has an invalid phone number"); },
    _a[PolicyKey.ValidQueryFilter] = function (property) {
        return "".concat(property, " has failed the \"VALID_QUERY_FILTER\" policy");
    },
    _a[PolicyKey.ValidType] = function (property) { return "".concat(property, " has failed the \"VALID_TYPE\" policy"); },
    _a);
export default defaultMessageCreator;
//# sourceMappingURL=message-creator.js.map