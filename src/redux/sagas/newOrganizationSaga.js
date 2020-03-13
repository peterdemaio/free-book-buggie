import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

function* newOrganizationSaga() {
    yield takeEvery('POST_NEW_ORGANIZATION', postNewOrganization)
}

function* postNewOrganization(action) {
    console.log('in postNewOrganization', action.payload)
    try {
        let response = yield axios.post(`/api/organizations`, action.payload)
        console.log('newOrganzationSaga', response);
        yield put ({type: 'UPDATE_ORGANIZATIONS', payload: response.data })
        
    } catch (error) {
        console.log('Error in newOrganizationSaga: ', error);
    }
}

export default newOrganizationSaga