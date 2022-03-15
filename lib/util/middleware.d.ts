import { RequestMiddleware, RequestObj } from '../config/interfaces';
import { ActionTypes } from '../config/enums';
/**
 * @function middlewareWrapper - A "Node" and "Redux" style middleware that is called just before
 * the request is made from the SDK. This allows you access to the request for modification.
 * @param request - A request object container of the URL and the Request Init object
 * @param action - The action object that is passed into the middleware communicating intent
 * @param action.type - A "Redux" style type that contains the serialized action
 * @param action.payload - The payload of the action that can contain metadata
 * @returns {function} - Function that takes middleware parameter & runs middleware against request
 */
declare function middlewareWrapper(request: RequestObj, { type, payload }: {
    type: ActionTypes;
    payload?: any;
}): (middleware: RequestMiddleware[] | undefined) => RequestObj;
export default middlewareWrapper;
