import axios from 'axios'
import { put, takeEvery, } from 'redux-saga/effects';

function* watcherSaga() {
    yield takeEvery('ADD_BOOKS', submitBooks)
}

function* submitBooks(action) {
    try {
        let response = yield axios.post('/api/bookIn', action.payload)
        console.log(response.data)
        yield put({ type: 'POST_HILL', payload: response.data})
    }
    catch (error) {
        console.log('Error submitting books collected', error)
    }
}


export default watcherSaga;