const organizations = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORGANIZATIONS':
            return action.payload;
        case 'SEARCH_ORGANIZATIONS_RESULTS':
            return action.payload;
        default:
            return state;
    }
};

export default organizations