type EventHandler = (...args: any[]) => void;
declare class EventEmitter {
    private events;
    constructor();
    addEvent(eventName: string, handler: EventHandler): void;
    removeEvent(eventName: string, handler: EventHandler): void;
    dispatch(eventName: string, ...args: any[]): void;
}
export type StateType<T> = {
    state: () => T;
    updateState: (newState: T | Partial<T>) => void;
    EventEmitter: EventEmitter;
};
declare const ss: {
    create: <T>(initialState: T, eventEmitter?: EventEmitter) => StateType<T>;
    EventEmitter: typeof EventEmitter;
};
export default ss;
