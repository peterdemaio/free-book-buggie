import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios'

function* organizationsSaga() {
    yield takeEvery ('GET_ORGANIZATIONS', getOrganizations)
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

export default organizationsSaga