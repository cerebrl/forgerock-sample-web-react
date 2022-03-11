import { StringDict } from '../shared/interfaces';
/**
 * @class Collector - base class for FRDevice
 * Generic collector functions for collecting a device profile attributes
 */
declare class Collector {
    /**
     * @method reduceToObject - goes one to two levels into source to collect attribute
     * @param props - array of strings; can use dot notation for two level lookup
     * @param src - source of attributes to check
     */
    reduceToObject(props: string[], src: StringDict<any>): StringDict<string>;
    /**
     * @method reduceToString - goes one level into source to collect attribute
     * @param props - array of strings
     * @param src - source of attributes to check
     */
    reduceToString(props: string[], src: any): string;
}
export default Collector;
