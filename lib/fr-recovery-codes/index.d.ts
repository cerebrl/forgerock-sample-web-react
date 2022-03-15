import FRStep from '../fr-auth/fr-step';
/**
 * Utility for handling recovery code nodes.
 *
 * Example:
 *
 * ```js
 * // Determine if step is Display Recovery Codes step
 * const isDisplayRecoveryCodesStep = FRRecoveryCodes.isDisplayStep(step);
 * if (isDisplayRecoveryCodesStep) {
 *   const recoveryCodes = FRRecoveryCodes.getCodes(step);
 *   // Do the UI needful
 * }
 * ```
 */
declare abstract class FRRecoveryCodes {
    /**
     * Retrieves the recovery codes by parsing the JavaScript message text in callback.
     *
     * @param step The step to evaluate
     * @return Recovery Code values in array
     */
    static getCodes(step: FRStep): string[];
    /**
     * Determines if the given step is a Display Recovery Codes step.
     *
     * @param step The step to evaluate
     * @return Is this step a Display Recovery Codes step
     */
    static isDisplayStep(step: FRStep): boolean;
    /**
     * Gets the recovery codes step.
     *
     * @param step The step to evaluate
     * @return gets the Display Recovery Codes' callback
     */
    private static getDisplayCallback;
}
export default FRRecoveryCodes;
