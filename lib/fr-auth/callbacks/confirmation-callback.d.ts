import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to collect a confirmation to a message.
 */
declare class ConfirmationCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the index position of the confirmation's default answer.
     */
    getDefaultOption(): number;
    /**
     * Gets the confirmation's message type.
     */
    getMessageType(): number;
    /**
     * Gets the confirmation's possible answers.
     */
    getOptions(): string[];
    /**
     * Gets the confirmation's option type.
     */
    getOptionType(): number;
    /**
     * Gets the confirmation's prompt.
     */
    getPrompt(): string;
    /**
     * Set option index.
     */
    setOptionIndex(index: number): void;
    /**
     * Set option value.
     */
    setOptionValue(value: string): void;
}
export default ConfirmationCallback;
