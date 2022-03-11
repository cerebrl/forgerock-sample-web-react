/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { add, clear, remove } from './helpers';
/**
 * Event dispatcher for subscribing and publishing categorized events.
 */
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.callbacks = {};
    }
    /**
     * Subscribes to an event type.
     *
     * @param type The event type
     * @param listener The function to subscribe to events of this type
     */
    Dispatcher.prototype.addEventListener = function (type, listener) {
        add(this.callbacks, type, listener);
    };
    /**
     * Unsubscribes from an event type.
     *
     * @param type The event type
     * @param listener The function to unsubscribe from events of this type
     */
    Dispatcher.prototype.removeEventListener = function (type, listener) {
        remove(this.callbacks, type, listener);
    };
    /**
     * Unsubscribes all listener functions to a single event type or all event types.
     *
     * @param type The event type, or all event types if not specified
     */
    Dispatcher.prototype.clearEventListeners = function (type) {
        clear(this.callbacks, type);
    };
    /**
     * Publishes an event.
     *
     * @param event The event object to publish
     */
    Dispatcher.prototype.dispatchEvent = function (event) {
        if (!this.callbacks[event.type]) {
            return;
        }
        for (var _i = 0, _a = this.callbacks[event.type]; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(event);
        }
    };
    return Dispatcher;
}());
export default Dispatcher;
//# sourceMappingURL=index.js.map