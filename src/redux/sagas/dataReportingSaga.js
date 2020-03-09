import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getEvents() {
    const response = yield axios.get('/api/events')
    yield put({type: 'SET_EVENTS', payload: response.data})
}

function* dataReportingSaga() {
    yield takeEvery('GET_EVENTS', getEvents)
}

export default dataReportingSaga;