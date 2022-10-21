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
    // @ts-expect-error
    expectType<MyEvent2>(e);
});

eventTarget.addEventListener('custom', (e) => {
    expectType<CustomEvent<number>>(e);
});

// ----- Event in callback of removeEventListener works with all types of events

eventTarget.removeEventListener('event', (e) => {
    expectType<Event>(e);
});

eventTarget.addEventListener('my', (e) => {
    expectType<MyEvent>(e);
});

eventTarget.addEventListener('custom', (e) => {
    expectType<CustomEvent<number>>(e);
});

// ----- Unknown event types should error

// @ts-expect-error
eventTarget.addEventListener('unknown', (e) => {});

// @ts-expect-error
eventTarget.removeEventListener('unknown', (e) => {});

// ----- non-Event types in a EventMap should error

// @ts-expect-error
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

// @ts-expect-error
eventTarget.dispatchTypedEvent('my', new MyEvent2('my2'));

// @ts-expect-error
eventTarget.dispatchTypedEvent('unknown', new Event('unknown'));
