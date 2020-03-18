import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getBookData() {
    // console.log('in getBookSaga')
    const response = yield axios.get('/api/data')

    yield put({ type: 'SET_BOOK_DATA', payload: response.data})
}


function* getBookSaga() {
    yield takeEvery('GET_BOOK_COUNT_DATA', getBookData)
}

export default getBookSaga;