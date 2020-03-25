import axios from 'axios'
import { put, takeEvery, } from 'redux-saga/effects';

function* watcherSaga() {
    yield takeEvery('ADD_EVENT', submitEvent);
    yield takeEvery('VOLUNTEER_EVENT', volunteerEvent)
    yield takeEvery('GET_EVENTS', getEvents)
}

function* submitEvent(action) {
    try {
        let response = yield axios.post('/api/events', action.payload)
        yield put({ type: 'POST_EVENT', payload: response.data})
    }
    catch (error) {
    }
}

function* getEvents(action) {
    try {
        let response = yield axios.get('/api/events')
        yield put ({ type: 'SET_EVENTS', payload: response.data })
    } catch (err) {
    }
}

function* volunteerEvent(action) {
    try {
        yield axios.post('/api/events', action.payload)
        //yield put({ type: 'SET_CURRENT_EVENT', payload: response.data})
    }
    catch (error) {
    }
}

// function* giveBooks(action) {
//     try {
//         let response = yield axios.post('/api/bookOut', action.payload)
//         yield put({ type: 'POST_BOOK', payload: response.data})
//     }
//     catch (error) {
//     }
// }


export default watcherSaga;