import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to collect acceptance of terms and conditions.
 */
declare class TermsAndConditionsCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the terms and conditions content.
     */
    getTerms(): string;
    /**
     * Gets the version of the terms and conditions.
     */
    getVersion(): string;
    /**
     * Gets the date of the terms and conditions.
     */
    getCreateDate(): Date;
    /**
     * Sets the callback's acceptance.
     */
    setAccepted(accepted?: boolean): void;
}
export default TermsAndConditionsCallback;
