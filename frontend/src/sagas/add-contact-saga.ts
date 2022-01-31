import { put, takeEvery, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as actions from "../actions";
import * as ACTIONS from "../action-types";
import { api } from "../api";

interface ResponseGenerator {
  contact?: any;
  success: boolean;
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* addContact(data: any) {
  const { result, contacts } = data.payload;
  try {
    const contactResult: ResponseGenerator = yield call(
      api,
      `api/contact`,
      "POST",
      result
    );
    if (contactResult.success === true) {
      toast.success("Contact Added successfully");
      const updatedContactList: any = [contactResult.contact, ...contacts];
      yield put(actions.setContactList(updatedContactList));
    } else {
      toast.error("Could not add contact");
    }
    yield put(actions.setAddContactFormMode());
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* addContactSaga() {
  yield takeEvery(ACTIONS.ADD_CONTACT, addContact);
}
