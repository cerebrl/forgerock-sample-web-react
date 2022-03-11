/**
 * Implementation of the Deferred API to simplify handling of Promises.
 */
declare class Deferred<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: unknown) => void;
    constructor();
}
export default Deferred;
