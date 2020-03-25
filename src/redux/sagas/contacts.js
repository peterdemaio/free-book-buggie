import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios'

function* contactsSaga() {
    yield takeEvery ('GET_CONTACTS', getContacts)
    yield takeEvery ('EDIT_CONTACT', editContacts)
}

function* editContacts(action) {
    try {
        let response = yield axios.put('/api/contacts', action.payload)
        yield put ({type: 'UPDATE_CONTACTS', payload: response.data })
    } catch (err) {
    }
}
function* getContacts(action) {
    try {
        let response = yield axios.get('/api/contacts')
        yield put ({ type: 'SET_CONTACTS', payload: response.data })
    } catch (err){
    }
}


export default contactsSaga