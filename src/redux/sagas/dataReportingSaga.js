import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getData(action) {
    console.log('in dataReportingSage, action.payload:', action.payload)
    const response = yield axios.post('/api/data', action.payload)
    yield put({type: 'SET_DATA', payload: response.data})
    const responseExcel = yield axios.post('/api/dataExcel', action.payload)
    yield put({type: 'SET_DATA_EXCEL', payload: responseExcel.data})
}

function* dataReportingSaga() {
    yield takeEvery('GET_DATA', getData)
}

export default dataReportingSaga;