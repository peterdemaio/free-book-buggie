const chartData = (state = {}, action) => {
    if (action.type === 'SET_DATA') {
        
        
        let chartData = {
            labels: action.payload.labels,
            datasets: [
                {
                    label: action.payload.label,
                    data: action.payload.data,
                    backgroundColor: ['#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F',
                    '#E57373','#64B5F6','#81C784','#FFF176','#FF8A65','#F06292','#9575CD','#4DD0E1','#DCE775','#FFD54F','#A1887F']                }
            ]
        }
        return chartData; 
    
    } else {
        return state;
    }
}

export default chartData;