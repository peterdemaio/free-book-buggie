import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
<<<<<<< HEAD
<<<<<<< HEAD
import organizationsSaga from './organizations';
import newOrganizationSaga from './newOrganizationSaga';
import bookSaga from './bookSaga';
=======
=======

import organizationsSaga from './organizations';
import newOrganizationSaga from './newOrganizationSaga';
import bookSaga from './bookSaga';

>>>>>>> a142561fc6f74d2666ccf3e0861efcaad7f6edaf
import dataReportingSaga from './dataReportingSaga';
import contactsSaga from './contacts';
import organizationsSaga from './organizations'
import newOrganizationSaga from './newOrganizationSaga'
import bookSaga from './bookSaga'
<<<<<<< HEAD
>>>>>>> ea4d7db3365d59b891c08433afe42a067fb607c0
=======

>>>>>>> a142561fc6f74d2666ccf3e0861efcaad7f6edaf

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    dataReportingSaga(),
    contactsSaga(),
    organizationsSaga(),
    newOrganizationSaga(),
    bookSaga(),
  ]);
}
