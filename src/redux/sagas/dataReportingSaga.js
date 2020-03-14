import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getData(action) {
    console.log('in getData', action.payload);
    
    const response = yield axios.post('/api/data', action.payload)
    yield put({type: 'SET_DATA', payload: response.data})
}

function* dataReportingSaga() {
   
    yield takeEvery('GET_DATA', getData)
}

export default dataReportingSaga;