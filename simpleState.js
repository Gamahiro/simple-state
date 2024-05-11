"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        this.events = {};
    }
    addEvent(eventName, handler) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }
    removeEvent(eventName, handler) {
        const eventHandlers = this.events[eventName];
        if (eventHandlers) {
            this.events[eventName] = eventHandlers.filter(h => h !== handler);
        }
    }
    dispatch(eventName, ...args) {
        const eventHandlers = this.events[eventName];
        if (eventHandlers) {
            eventHandlers.forEach(handler => handler(...args));
        }
    }
}
const createState = (initialState, eventEmitter) => {
    let state = initialState;
    const emitter = eventEmitter || new EventEmitter();
    const updateState = (newState) => {
        if (Array.isArray(state) && Array.isArray(newState)) {
            state = newState;
        }
        else {
            state = Object.assign(Object.assign({}, state), newState);
        }
        emitter.dispatch('update', state);
    };
    return {
        state: () => state,
        updateState: (newState) => updateState(newState),
        EventEmitter: emitter
    };
};
const ss = {
    create: createState,
    EventEmitter
};
exports.default = ss;
