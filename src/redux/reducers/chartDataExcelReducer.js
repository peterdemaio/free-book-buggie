const chartDataExcel = (state = [], action) => {
    if (action.type === 'SET_DATA_EXCEL') {
        console.log('in chartDataExcelReducer. action.payload:', action.payload)
        return action.payload; 
    
    } else {
        return state;
    }
}

export default chartDataExcel;