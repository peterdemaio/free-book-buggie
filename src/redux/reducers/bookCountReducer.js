const bookCountReducer = (state = [], action) => {
    console.log('in SET_BOOK_DATA', action.payload);
    
    switch (action.type) {
        case 'SET_BOOK_DATA':
            return action.payload;
        default:
            return state;
    } 
   
};

export default bookCountReducer;