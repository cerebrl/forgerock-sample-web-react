/**
 * @module
 * @ignore
 * These are private utility functions
 */
declare function withTimeout<T>(promise: Promise<T>, timeout?: number): Promise<T>;
export { withTimeout };
