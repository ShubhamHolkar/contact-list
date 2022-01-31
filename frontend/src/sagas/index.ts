import { all } from "redux-saga/effects";

import addContactSaga from "./add-contact-saga";
import updateContactSaga from "./update-contact-saga";
import deleteContactSaga from "./delete-contact-saga";
import loginSaga from "./login-saga";
import registerSaga from "./register-saga";
import fetchContactListSaga from "./fetch-contactlist-saga";
import verifyAccountSaga from "./verify-account-saga";
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    fetchContactListSaga(),
    addContactSaga(),
    updateContactSaga(),
    deleteContactSaga(),
    verifyAccountSaga(),
  ]);
}
