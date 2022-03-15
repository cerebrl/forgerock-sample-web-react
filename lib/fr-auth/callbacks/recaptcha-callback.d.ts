import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to integrate reCAPTCHA.
 */
declare class ReCaptchaCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the reCAPTCHA site key.
     */
    getSiteKey(): string;
    /**
     * Sets the reCAPTCHA result.
     */
    setResult(result: string): void;
}
export default ReCaptchaCallback;
