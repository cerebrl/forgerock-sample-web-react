import { Step, StepOptions } from './interfaces';
/**
 * Provides direct access to the OpenAM authentication tree API.
 */
declare abstract class Auth {
    /**
     * Gets the next step in the authentication tree.
     *
     * @param {Step} previousStep The previous step, including any required input.
     * @param {StepOptions} options Configuration default overrides.
     * @return {Step} The next step in the authentication tree.
     */
    static next(previousStep?: Step, options?: StepOptions): Promise<Step>;
    private static constructUrl;
    private static configureRequest;
    private static getResponseJson;
}
export default Auth;
