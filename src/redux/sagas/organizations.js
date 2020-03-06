import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios'

function* organizationsSaga() {
    yield takeEvery ('GET_ORGANIZATIONS', getOrganizations)
    yield takeEvery ('SEARCH_ORGANIZATIONS', searchOrganizations)
}
function* getOrganizations(action) {
    try {
        console.log('in get organizations saga')
        let response = yield axios.get('/api/organizations')
        yield put ({ type: 'SET_ORGANIZATIONS', payload: response.data })
    } catch (err){
        console.log('Error getting organizations:', err)
    }
}

function* searchOrganizations(action) {
    try {
        console.log('searching for organization:', action.payload)
        let response = yield axios.get(`/api/organizations/search?searchterm=${action.payload}`)
        yield put ({ type: 'SEARCH_ORGANIZATIONS_RESULTS', payload: response.data})
    }   catch (err){
        console.log('Error searching for organizations:', err)
    }
}

export default organizationsSaga