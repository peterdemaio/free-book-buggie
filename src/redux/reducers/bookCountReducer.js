const bookCount = (state = [], action) => {
    console.log('in SET_BOOK_DATA', action.payload[0]);
    
    switch (action.type) {
        case 'SET_BOOK_DATA':
            return action.payload;
        default:
            return state;
    } 
   
};

export default bookCount;