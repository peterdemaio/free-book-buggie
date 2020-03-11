import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios'

function* organizationsSaga() {
    yield takeEvery ('GET_ORGANIZATIONS', getOrganizations)
    yield takeEvery ('EDIT_ORGANIZATION', editOrganization)
}

function* editOrganization(action) {
    console.log('ready to edit organizaiton:', action.payload)
    try {
        let response = yield axios.put('/api/organizations', action.payload)
        console.log('here is the returning data:', response.data)
        yield put ({type: 'UPDATE_ORGANIZATIONS', payload: response.data })
    } catch (err) {
        console.log('err editing organization', err)
    }
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