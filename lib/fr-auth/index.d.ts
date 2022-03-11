import { StepOptions } from '../auth/interfaces';
import FRLoginFailure from './fr-login-failure';
import FRLoginSuccess from './fr-login-success';
import FRStep from './fr-step';
/**
 * Provides access to the OpenAM authentication tree API.
 */
declare abstract class FRAuth {
    static readonly previousStepKey = "FRAuth_PreviousStep";
    /**
     * Requests the next step in the authentication tree.
     *
     * Call `FRAuth.next()` recursively.  At each step, check for session token or error, otherwise
     * populate the step's callbacks and call `next()` again.
     *
     * Example:
     *
     * ```js
     * async function nextStep(previousStep) {
     *   const thisStep = await FRAuth.next(previousStep);
     *
     *   switch (thisStep.type) {
     *     case StepType.LoginSuccess:
     *       const token = thisStep.getSessionToken();
     *       break;
     *     case StepType.LoginFailure:
     *       const detail = thisStep.getDetail();
     *       break;
     *     case StepType.Step:
     *       // Populate `thisStep` callbacks here, and then continue
     *       thisStep.setInputValue('foo');
     *       nextStep(thisStep);
     *       break;
     *   }
     * }
     * ```
     *
     * @param previousStep The previous step with its callback values populated
     * @param options Configuration overrides
     * @return The next step in the authentication tree
     */
    static next(previousStep?: FRStep, options?: StepOptions): Promise<FRStep | FRLoginSuccess | FRLoginFailure>;
    /**
     * Redirects to the URL identified in the RedirectCallback and saves the full
     * step information to localStorage for retrieval when user returns from login.
     *
     * Example:
     * ```js
     * forgerock.FRAuth.redirect(step);
     * ```
     */
    static redirect(step: FRStep): void;
    /**
     * Resumes a tree after returning from an external client or provider.
     * Requires the full URL of the current window. It will parse URL for
     * key-value pairs as well as, if required, retrieves previous step.
     *
     * Example;
     * ```js
     * forgerock.FRAuth.resume(window.location.href)
     * ```
     */
    static resume(url: string, options?: StepOptions): Promise<FRStep | FRLoginSuccess | FRLoginFailure>;
    /**
     * Requests the first step in the authentication tree.
     * This is essentially an alias to calling FRAuth.next without a previous step.
     *
     * @param options Configuration overrides
     * @return The next step in the authentication tree
     */
    static start(options?: StepOptions): Promise<FRStep | FRLoginSuccess | FRLoginFailure>;
}
export default FRAuth;
