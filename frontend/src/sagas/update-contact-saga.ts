import { put, takeEvery, call } from "redux-saga/effects";
import * as actions from "../actions";
import * as ACTIONS from "../action-types";
import toast from "react-hot-toast";
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
function* updateContact(data: any) {
  const { result, contacts } = data.payload;
  try {
    const contactResult: ResponseGenerator = yield call(
      api,
      `api/contact`,
      "PUT",
      result
    );
    if (contactResult.success === true) {
      toast.success("Contact updated successfully");
      const updatedContactList = contacts.map(
        (contact: { contact_id: any }) => {
          if (contact.contact_id === contactResult.contact.contact_id) {
            return contactResult.contact;
          }
          return contact;
        }
      );
      yield put(actions.setContactList(updatedContactList));
    } else {
      toast.error("Could not update contact");
    }
    yield put(actions.setAddContactFormMode());
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* updateContactSaga() {
  yield takeEvery(ACTIONS.UPDATE_CONTACT, updateContact);
}
