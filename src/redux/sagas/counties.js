import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios'

function* countiesSaga() {
    yield takeEvery ('FETCH_COUNTIES', getCounties)
}

function* getCounties(action) {
    try {
        let response = yield axios.get('/api/counties')
        yield put ({ type: 'SET_COUNTIES', payload: response.data })
    } catch (err){
        console.log('Error getting counties:', err)
    }
}


export default countiesSaga