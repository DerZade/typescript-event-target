declare type TypedEventListener<M, T extends keyof M> = (evt: M[T]) => void | Promise<void>;
interface TypedEventListenerObject<M, T extends keyof M> {
    handleEvent: (evt: M[T]) => void | Promise<void>;
}
declare type ValueIsEvent<T> = {
    [key in keyof T]: Event;
};
declare type TypedEventListenerOrEventListenerObject<M, T extends keyof M> = TypedEventListener<M, T> | TypedEventListenerObject<M, T>;
interface TypedEventTarget<M extends ValueIsEvent<M>> {
    /** Appends an event listener for events whose type attribute value is type.
     * The callback argument sets the callback that will be invoked when the event
     * is dispatched.
     *
     * The options argument sets listener-specific options. For compatibility this
     * can be a boolean, in which case the method behaves exactly as if the value
     * was specified as options's capture.
     *
     * When set to true, options's capture prevents callback from being invoked
     * when the event's eventPhase attribute value is BUBBLING_PHASE. When false
     * (or not present), callback will not be invoked when event's eventPhase
     * attribute value is CAPTURING_PHASE. Either way, callback will be invoked if
     * event's eventPhase attribute value is AT_TARGET.
     *
     * When set to true, options's passive indicates that the callback will not
     * cancel the event by invoking preventDefault(). This is used to enable
     * performance optimizations described in § 2.8 Observing event listeners.
     *
     * When set to true, options's once indicates that the callback will only be
     * invoked once after which the event listener will be removed.
     *
     * The event listener is appended to target's event listener list and is not
     * appended if it has the same type, callback, and capture. */
    addEventListener: <T extends keyof M & string>(type: T, listener: TypedEventListenerOrEventListenerObject<M, T> | null, options?: boolean | AddEventListenerOptions) => void;
    /** Removes the event listener in target's event listener list with the same
     * type, callback, and options. */
    removeEventListener: <T extends keyof M & string>(type: T, callback: TypedEventListenerOrEventListenerObject<M, T> | null, options?: EventListenerOptions | boolean) => void;
    /**
     * Dispatches a synthetic event event to target and returns true if either
     * event's cancelable attribute value is false or its preventDefault() method
     * was not invoked, and false otherwise.
     * @deprecated To ensure type safety use `dispatchTypedEvent` instead.
     */
    dispatchEvent: (event: Event) => boolean;
}
declare class TypedEventTarget<M extends ValueIsEvent<M>> extends EventTarget {
    /**
     * Dispatches a synthetic event event to target and returns true if either
     * event's cancelable attribute value is false or its preventDefault() method
     * was not invoked, and false otherwise.
     */
    dispatchTypedEvent<T extends keyof M>(_type: T, event: M[T]): boolean;
}

export { TypedEventTarget };
