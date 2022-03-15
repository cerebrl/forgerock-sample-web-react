import { MessageCreator, ProcessedPropertyError } from '../fr-policy/interfaces';
import { Step } from '../auth/interfaces';
import { StepType } from './enums';
import { AuthResponse, FailureDetail } from './interfaces';
declare class FRLoginFailure implements AuthResponse {
    payload: Step;
    /**
     * The type of step.
     */
    readonly type = StepType.LoginFailure;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Step);
    /**
     * Gets the error code.
     */
    getCode(): number;
    /**
     * Gets the failure details.
     */
    getDetail(): FailureDetail | undefined;
    /**
     * Gets the failure message.
     */
    getMessage(): string | undefined;
    /**
     * Gets processed failure message.
     */
    getProcessedMessage(messageCreator?: MessageCreator): ProcessedPropertyError[];
    /**
     * Gets the failure reason.
     */
    getReason(): string | undefined;
}
export default FRLoginFailure;
