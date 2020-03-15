const counties = (state = [], action) => {
    switch (action.type) {
        case 'SET_COUNTIES':
            return action.payload;
        default:
            return state;
    }
};

export default counties;
  