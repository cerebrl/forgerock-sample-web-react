import { CallbackType } from '../auth/enums';
import { Step } from '../auth/interfaces';
import FRCallback from './callbacks';
import { FRCallbackFactory } from './callbacks/factory';
import { StepType } from './enums';
import { AuthResponse } from './interfaces';
/**
 * Represents a single step of an authentication tree.
 */
declare class FRStep implements AuthResponse {
    payload: Step;
    /**
     * The type of step.
     */
    readonly type = StepType.Step;
    /**
     * The callbacks contained in this step.
     */
    callbacks: FRCallback[];
    /**
     * @param payload The raw payload returned by OpenAM
     * @param callbackFactory A function that returns am implementation of FRCallback
     */
    constructor(payload: Step, callbackFactory?: FRCallbackFactory);
    /**
     * Gets the first callback of the specified type in this step.
     *
     * @param type The type of callback to find.
     */
    getCallbackOfType<T extends FRCallback>(type: CallbackType): T;
    /**
     * Gets all callbacks of the specified type in this step.
     *
     * @param type The type of callback to find.
     */
    getCallbacksOfType<T extends FRCallback>(type: CallbackType): T[];
    /**
     * Sets the value of the first callback of the specified type in this step.
     *
     * @param type The type of callback to find.
     * @param value The value to set for the callback.
     */
    setCallbackValue(type: CallbackType, value: unknown): void;
    /**
     * Gets the step's description.
     */
    getDescription(): string | undefined;
    /**
     * Gets the step's header.
     */
    getHeader(): string | undefined;
    /**
     * Gets the step's stage.
     */
    getStage(): string | undefined;
    private convertCallbacks;
}
/**
 * A function that can populate the provided authentication tree step.
 */
declare type FRStepHandler = (step: FRStep) => void;
export default FRStep;
export { FRStepHandler };
