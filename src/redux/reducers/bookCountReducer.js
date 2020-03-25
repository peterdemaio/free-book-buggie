
const bookCountReducer = (state = [{sum: 0}, {sum: 0}], action) => {
    
    switch (action.type) {
        case 'SET_BOOK_DATA':
            return action.payload;
        default:
            return state;
    } 
   
};

export default bookCountReducer;