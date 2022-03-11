/** @hidden */
declare class LocalStorage {
    private storage;
    constructor(persist?: boolean);
    get<T>(key: string): T | undefined;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
}
export default LocalStorage;
