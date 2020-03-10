const updateOrganizations = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ORGANIZATIONS':
            return action.payload;
        default:
            return state;
    }
}

export default updateOrganizations