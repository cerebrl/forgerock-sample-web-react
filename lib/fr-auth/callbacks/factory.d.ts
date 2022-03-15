import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
declare type FRCallbackFactory = (callback: Callback) => FRCallback;
/**
 * @hidden
 */
declare function createCallback(callback: Callback): FRCallback;
export default createCallback;
export { FRCallbackFactory };
