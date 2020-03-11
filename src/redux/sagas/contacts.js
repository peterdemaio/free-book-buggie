import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios'

function* contactsSaga() {
    yield takeEvery ('GET_CONTACTS', getContacts)
    yield takeEvery ('EDIT_CONTACT', editContacts)
}

function* editContacts(action) {
    console.log('ready to edit contact:', action.payload)
    try {
        let response = yield axios.put('/api/contacts', action.payload)
        console.log('here is the returning data:', response.data)
        yield put ({type: 'UPDATE_CONTACTS', payload: response.data })
    } catch (err) {
        console.log('err editing contacts', err)
    }
}
function* getContacts(action) {
    try {
        console.log('in get contacts saga')
        let response = yield axios.get('/api/contacts')
        yield put ({ type: 'SET_CONTACTS', payload: response.data })
    } catch (err){
        console.log('Error getting contacts:', err)
    }
}


export default contactsSaga