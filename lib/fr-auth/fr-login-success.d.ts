import { Step } from '../auth/interfaces';
import { StepType } from './enums';
import { AuthResponse } from './interfaces';
declare class FRLoginSuccess implements AuthResponse {
    payload: Step;
    /**
     * The type of step.
     */
    readonly type = StepType.LoginSuccess;
    /**
     * @param payload The raw payload returned by OpenAM
     */
    constructor(payload: Step);
    /**
     * Gets the step's realm.
     */
    getRealm(): string | undefined;
    /**
     * Gets the step's session token.
     */
    getSessionToken(): string | undefined;
    /**
     * Gets the step's success URL.
     */
    getSuccessUrl(): string | undefined;
}
export default FRLoginSuccess;
