import axios from 'axios'
import { put, takeEvery, } from 'redux-saga/effects';

function* watcherSaga() {
    yield takeEvery('ADD_EVENT', submitEvent);
    yield takeEvery('VOLUNTEER_EVENT', VolunteerEvent)
    yield takeEvery('GET_EVENTS', getEvents)
}

function* submitEvent(action) {
    try {
        let response = yield axios.post('/api/events', action.payload)
        console.log(response.data)
        yield put({ type: 'POST_EVENT', payload: response.data})
    }
    catch (error) {
        console.log('Error submitting event collected', error)
    }
}

function* getEvents(action) {
    console.log('getting events', action.payload)
    try {
        let response = yield axios.get('/api/events')
        console.log('here is the returning data:', response.data)
        yield put ({ type: 'SET_EVENTS', payload: response.data })
    } catch (err) {
        console.log('error getting events:', err)
    }
}

function* VolunteerEvent(action) {
    try {
        let response = yield axios.post('/api/events', action.payload)
        console.log(response.data)
        yield put({ type: 'POST_EVENT', payload: response.data})
    }
    catch (error) {
        console.log('Error submitting event collected', error)
    }
}

// function* giveBooks(action) {
//     try {
//         let response = yield axios.post('/api/bookOut', action.payload)
//         console.log(response.data)
//         yield put({ type: 'POST_BOOK', payload: response.data})
//     }
//     catch (error) {
//         console.log('Error submitting books collected', error)
//     }
// }


export default watcherSaga;