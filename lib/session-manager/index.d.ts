import { ConfigOptions } from '../config/index';
/**
 * Provides access to the session management API.
 */
declare abstract class SessionManager {
    /**
     * Ends the current session.
     */
    static logout(options?: ConfigOptions): Promise<Response>;
}
export default SessionManager;
