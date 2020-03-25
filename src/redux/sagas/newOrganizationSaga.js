import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

function* newOrganizationSaga() {
    yield takeEvery('POST_NEW_ORGANIZATION', postNewOrganization)
}

function* postNewOrganization(action) {
    try {
        let response = yield axios.post(`/api/organizations`, action.payload)
        yield put ({type: 'UPDATE_ORGANIZATIONS', payload: response.data })
        
    } catch (error) {
    }
}

export default newOrganizationSaga