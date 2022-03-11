import { FailedPolicyRequirement, PolicyRequirement, Step } from '../auth/interfaces';
import { PolicyKey } from './enums';
import { MessageCreator, ProcessedPropertyError } from './interfaces';
/**
 * Utility for processing policy failures into human readable messages.
 *
 * Example:
 *
 * ```js
 * // Create message overrides and extensions as needed
 * const messageCreator = {
 *   [PolicyKey.unique]: (property: string) => (
 *     `this is a custom message for "UNIQUE" policy of ${property}`
 *   ),
 *   CUSTOM_POLICY: (property: string, params: any) => (
 *     `this is a custom message for "${params.policyRequirement}" policy of ${property}`
 *   ),
 * };
 *
 * const thisStep = await FRAuth.next(previousStep);
 *
 * if (thisStep.type === StepType.LoginFailure) {
 *   const messagesStepMethod = thisStep.getProcessedMessage(messageCreator);
 *   const messagesClassMethod = FRPolicy.parseErrors(thisStep, messageCreator)
 * }
 */
declare abstract class FRPolicy {
    /**
     * Parses policy errors and generates human readable error messages.
     *
     * @param {Step} err The step containing the error.
     * @param {MessageCreator} messageCreator
     * Extensible and overridable custom error messages for policy failures.
     * @return {ProcessedPropertyError[]} Array of objects containing all processed policy errors.
     */
    static parseErrors(err: Partial<Step>, messageCreator?: MessageCreator): ProcessedPropertyError[];
    /**
     * Parses a failed policy and returns a string array of error messages.
     *
     * @param {FailedPolicyRequirement} failedPolicy The detail data of the failed policy.
     * @param {MessageCreator} customMessage
     * Extensible and overridable custom error messages for policy failures.
     * @return {string[]} Array of strings with all processed policy errors.
     */
    static parseFailedPolicyRequirement(failedPolicy: FailedPolicyRequirement, messageCreator?: MessageCreator): string[];
    /**
     * Parses a policy error into a human readable error message.
     *
     * @param {string} property The property with the policy failure.
     * @param {PolicyRequirement} policy The policy failure data.
     * @param {MessageCreator} customMessage
     * Extensible and overridable custom error messages for policy failures.
     * @return {string} Human readable error message.
     */
    static parsePolicyRequirement(property: string, policy: PolicyRequirement, messageCreator?: MessageCreator): string;
}
export default FRPolicy;
export { PolicyKey, MessageCreator, ProcessedPropertyError };
