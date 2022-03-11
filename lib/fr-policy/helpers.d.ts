declare function getProp<T>(obj: {
    [key: string]: unknown;
} | undefined, prop: string, defaultValue: T): T;
export { getProp };
