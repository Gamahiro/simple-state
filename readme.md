# Simple State

Framework agnostic simple state management

To create a state use the ss.createState function that returns the state object
The function expects an initial object or array, and can optionally be passed an EventEmitter

    const {state, updateState, EventEmitter} = ss.createState({name: 'Fred'});

The state property of the object is a function that returns the state.
    const stateValue = state();

The updateState property is a function that expects an argument of the new state.
    updateState([...state(),...newState]);

For objects using spread operators are the default. 
You can update the value of the property, or add a new property without passing the entire state object.

    const {state, updateState, EventEmitter} = ss.createState({name: 'Fred', age: 50});
    updateState({age: 51})
        
    state() will now return {name: 'Fred', age: 51}

Every stateObject also will return an EventEmitter. When the state is changed, the EventEmitter will dispatch an 'update' event.
To use this event you can use the addEvent method on the EventEmitter.

    const {state, updateState, EventEmitter} = ss.createState({name: 'Fred'});
    const logEventUpdate = () => console.log('state updated')

    EventEmitter.addEvent('update', logEventUpdate)

Events can also be removed

    EventEmitter.removeEvent('update', logEventUpdate)



