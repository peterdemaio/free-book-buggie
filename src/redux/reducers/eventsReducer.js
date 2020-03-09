const events = (state = [], action) => {
    if (action.type === 'SET_EVENTS') {
        return action.payload;
    } else {
        return state;
    }
}

export default events;