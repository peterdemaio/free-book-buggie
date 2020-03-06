import axios from 'axios'
import { takeEvery } from 'redux-saga/effects';

function* newOrganizationSaga() {
    yield takeEvery('POST_NEW_ORGANIZATION', postNewOrganization)
}

function* postNewOrganization(action) {
    console.log('in postNewOrganization', action.payload)

    try {
        yield axios.post(`/api/organizations`, action.payload)
    } catch (error) {
        console.log('Error in newOrganizationSaga: ', error);
    }
}

export default newOrganizationSaga