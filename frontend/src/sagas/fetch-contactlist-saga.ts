import { put, takeEvery, call, select } from "redux-saga/effects";
import toast from "react-hot-toast";

import * as actions from "../actions";
import * as ACTIONS from "../action-types";
import { api } from "../api";

interface ResponseGenerator {
  success: boolean;
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  contacts?: any;
}

function* fetchContactList() {
  const { userInfo } = yield select((state) => state);

  try {
    const contactListResult: ResponseGenerator = yield call(
      api,
      `api/contact?userid=${userInfo.id}`
    );

    yield put(actions.setContactList(contactListResult.contacts));
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* fetchContactListSaga() {
  yield takeEvery(ACTIONS.FETCH_CONTACT_LIST, fetchContactList);
}
