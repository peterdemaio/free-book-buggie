let initialEvent = {
    event_name: '',
    organizations_id: 0
}

const events = (state = [initialEvent], action) => {
    if (action.type === 'SET_EVENTS') {
        return action.payload; 
    
    } else {
        return state;
    }
}

export default events;