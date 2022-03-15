import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to collect an answer to a choice.
 */
declare class ChoiceCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the choice's prompt.
     */
    getPrompt(): string;
    /**
     * Gets the choice's default answer.
     */
    getDefaultChoice(): number;
    /**
     * Gets the choice's possible answers.
     */
    getChoices(): string[];
    /**
     * Sets the choice's answer by index position.
     */
    setChoiceIndex(index: number): void;
    /**
     * Sets the choice's answer by value.
     */
    setChoiceValue(value: string): void;
}
export default ChoiceCallback;
