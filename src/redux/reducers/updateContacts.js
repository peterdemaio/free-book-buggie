const updateContacts = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_CONTACTS':
            return action.payload;
        default:
            return state;
    }
}

export default updateContacts