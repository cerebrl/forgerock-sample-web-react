import { ConfigOptions } from '../config/interfaces';
/**
 * Provides access to the current user's profile.
 */
declare abstract class UserManager {
    /**
     * Gets the current user's profile.
     */
    static getCurrentUser(options?: ConfigOptions): Promise<unknown>;
}
export default UserManager;
