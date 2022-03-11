import { ConfigOptions } from '../config';
import FRStep, { FRStepHandler } from '../fr-auth/fr-step';
import FRUI from '../fr-ui';
/**
 * High-level API for logging a user in/out and getting profile information.
 */
declare abstract class FRUser {
    /**
     * Logs the user in with the specified step handler, acquires OAuth tokens, and retrieves
     * user profile.  **Currently not implemented.**
     *
     * @typeparam T The type of user object expected
     * @param handler The function to invoke when handling authentication steps
     * @param options Configuration overrides
     */
    static login<T>(handler: FRStepHandler, options?: ConfigOptions): Promise<FRStep | T>;
    /**
     * Logs the user in with the specified UI, acquires OAuth tokens, and retrieves user profile.
     *
     * @typeparam T The type of user object expected
     * @param ui The UI instance to use to acquire a session
     * @param options Configuration overrides
     */
    static loginWithUI<T>(ui: FRUI, options?: ConfigOptions): Promise<T>;
    /**
     * Ends the user's session and revokes OAuth tokens.
     *
     * @param options Configuration overrides
     */
    static logout(options?: ConfigOptions): Promise<void>;
}
export default FRUser;
