import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "../api";
import toast from "react-hot-toast";

import * as actions from "../actions";
import * as ACTIONS from "../action-types";

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

function* deleteContact(data: any) {
  const { contactIdToDelete, contacts } = data.payload;

  try {
    const contactDeleteResult: ResponseGenerator = yield call(
      api,
      `api/contact`,
      "DELETE",
      {
        contactid: contactIdToDelete.contact_id,
        phoneid: contactIdToDelete.phone_id,
      }
    );
    if (contactDeleteResult.success === true) {
      const updatedContactList: any = contacts.filter(
        (contact: { contact_id: any }) =>
          contact.contact_id !== contactIdToDelete.contact_id
      );
      yield put(actions.setContactList(updatedContactList));
      toast.success("Contact deleted successfully");
      yield put(actions.setAddContactFormMode());
    } else {
      toast.error("Could not delete contact!");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* deleteContactSaga() {
  yield takeEvery(ACTIONS.DELETE_CONTACT, deleteContact);
}
