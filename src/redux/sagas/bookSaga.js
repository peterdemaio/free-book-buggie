import axios from 'axios'
import { put, takeEvery, } from 'redux-saga/effects';

function* watcherSaga() {
    yield takeEvery('ADD_BOOKS', submitBooks);
    yield takeEvery('DISTRIBUTE_BOOKS', giveBooks)
}

function* submitBooks(action) {
    try {
        let response = yield axios.post('/api/bookIn', action.payload)
        console.log(response.data)
        yield put({ type: 'POST_BOOK', payload: response.data})
    }
    catch (error) {
        console.log('Error submitting books collected', error)
    }
}

function* giveBooks(action) {
    try {
        let response = yield axios.post('/api/bookOut', action.payload)
        console.log(response.data)
        yield put({ type: 'POST_BOOK', payload: response.data})
    }
    catch (error) {
        console.log('Error submitting books collected', error)
    }
}


export default watcherSaga;