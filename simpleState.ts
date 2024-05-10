
type EventHandler = (...args: any[]) => void;

class EventEmitter {
    private events: { [eventName: string]: EventHandler[] };

    constructor() {
        this.events = {};
    }

    addEvent(eventName: string, handler: EventHandler) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }

    removeEvent(eventName: string, handler: EventHandler) {
        const eventHandlers = this.events[eventName];
        if (eventHandlers) {
            this.events[eventName] = eventHandlers.filter(h => h !== handler);
        }
    }

    dispatch(eventName: string, ...args: any[]) {
        const eventHandlers = this.events[eventName];
        if (eventHandlers) {
            eventHandlers.forEach(handler => handler(...args));
        }
    }
}

type StateType<T> =  {state: () => T, updateState: (newState: T | Partial<T>) => void, EventEmitter: EventEmitter};

const createState =<T,> (initialState: T, eventEmitter?: EventEmitter): StateType<T> => {
    let state = initialState;
    const emitter = eventEmitter || new EventEmitter();

    const updateState = (newState: T | Partial<T>) => {
        if (Array.isArray(state) && Array.isArray(newState)) {
            state = newState as T;
        } else {
            state = { ...state as object, ...newState as object } as T;
        }
        emitter.dispatch('update', state);
    };

    return {
        state: () => state, 
        updateState: (newState: T | Partial<T>) => updateState(newState),
        EventEmitter: emitter
    };
};

const ss = {
    create: createState,
    EventEmitter
}

export default ss;