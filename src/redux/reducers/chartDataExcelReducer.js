const chartDataExcel = (state = [], action) => {
    if (action.type === 'SET_DATA_EXCEL') {
        return action.payload; 
    
    } else {
        return state;
    }
}

export default chartDataExcel;