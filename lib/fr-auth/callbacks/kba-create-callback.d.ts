import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
/**
 * Represents a callback used to collect KBA-style security questions and answers.
 */
declare class KbaCreateCallback extends FRCallback {
    payload: Callback;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Callback);
    /**
     * Gets the callback prompt.
     */
    getPrompt(): string;
    /**
     * Gets the callback's list of pre-defined security questions.
     */
    getPredefinedQuestions(): string[];
    /**
     * Sets the callback's security question.
     */
    setQuestion(question: string): void;
    /**
     * Sets the callback's security question answer.
     */
    setAnswer(answer: string): void;
    private setValue;
}
export default KbaCreateCallback;
