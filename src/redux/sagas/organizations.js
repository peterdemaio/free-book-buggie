import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'

function* organizationsSaga() {
    yield takeEvery('GET_ORGANIZATIONS', getOrganizations)
    yield takeEvery('EDIT_ORGANIZATION', editOrganization)
    yield takeEvery('DELETE_ORG', deleteOrg)
}

function* deleteOrg(action) {
    console.log('ready to delete with', action.payload.id)
    try {
        let id = action.payload.id
        yield axios.delete(`/api/organizations/${id}`)
        yield put({ type: 'GET_ORGANIZATIONS' })
    } catch (err) {
        console.log(err)
    }
}

function* editOrganization(action) {
    try {
        let response = yield axios.put('/api/organizations', action.payload)
        yield put({ type: 'GET_ORGANIZATIONS', payload: response.data })
    } catch (err) {
    }
}
function* getOrganizations(action) {
    try {
        let response = yield axios.get('/api/organizations')
        yield put({ type: 'SET_ORGANIZATIONS', payload: response.data })
    } catch (err) {
    }
}


export default organizationsSaga