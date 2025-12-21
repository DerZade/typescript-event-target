import { expectDeprecated, expectType } from 'tsd';
import { TypedEventTarget } from '../src/TypedEventTarget';

class MyEvent extends Event {
    public readonly foo = 3;
}
class MyEvent2 extends Event {
    public readonly foo2 = 3;
}

interface EventMap {
    event: Event;
    my: MyEvent;
    my2: MyEvent2;
    custom: CustomEvent<number>;
}

const eventTarget = new TypedEventTarget<EventMap>();

// ----- event in callback of addEventListener works with all types of events

eventTarget.addEventListener('event', (e) => {
    expectType<Event>(e);
});

eventTarget.addEventListener('my', (e) => {
    expectType<MyEvent>(e);
});

eventTarget.addEventListener('my', (e) => {
    // @ts-expect-error | This should error because MyEvent2 is not the correct type (should be MyEvent)
    expectType<MyEvent2>(e);
});

eventTarget.addEventListener('custom', (e) => {
    expectType<CustomEvent<number>>(e);
});

// ----- Event in callback of removeEventListener works with all types of events

eventTarget.removeEventListener('event', (e) => {
    expectType<Event>(e);
});

eventTarget.removeEventListener('my', (e) => {
    expectType<MyEvent>(e);
});

eventTarget.removeEventListener('custom', (e) => {
    expectType<CustomEvent<number>>(e);
});

// ----- Unknown event types should error

// @ts-expect-error | This should error because 'unknown' is not included in the EventMap
eventTarget.addEventListener('unknown', () => {});

// @ts-expect-error | This should error because 'unknown' is not included in the EventMap
eventTarget.removeEventListener('unknown', () => {});

// ----- non-Event types in a EventMap should error

// @ts-expect-error  | This should error because the type of 'foo2' does not extend Event
void new TypedEventTarget<{
    foo1: Event;
    foo2: { bar: string };
}>();

// ----- dispatchEvent is deprecated

expectDeprecated(eventTarget.dispatchEvent);

// ----- dispatchTypedEvent only accepts correct types

expectType<(_type: 'event', e: Event) => boolean>(
    eventTarget.dispatchTypedEvent<'event'>
);

expectType<(_type: 'my', e: MyEvent) => boolean>(
    eventTarget.dispatchTypedEvent<'my'>
);

expectType<(_type: 'custom', e: CustomEvent<number>) => boolean>(
    eventTarget.dispatchTypedEvent<'custom'>
);

// @ts-expect-error | This should error because the event types don't match
eventTarget.dispatchTypedEvent('my', new MyEvent2('my2'));

// @ts-expect-error | This should error because 'unknown' is not included in the EventMap
eventTarget.dispatchTypedEvent('unknown', new Event('unknown'));
