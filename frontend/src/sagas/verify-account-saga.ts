import { takeEvery, call, putResolve } from "redux-saga/effects";
import toast from "react-hot-toast";
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
  userExist: boolean;
  user?: any;
  error?: any;
}

function* verifyAccount(data: any) {
  const { email, token, navigate } = data.payload;

  try {
    const verifyResult: ResponseGenerator = yield call(
      api,
      `/api/auth/verify?email=${email}&usertoken=${token}`,
      "PUT"
    );
    if (verifyResult.success === true) {
      toast.success("Verified account successfully");
    } else if (verifyResult.success === false) {
      toast.error(verifyResult.error);
    }
    navigate("/login");
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* verifyAccountSaga() {
  yield takeEvery(ACTIONS.VERIFY_ACCOUNT, verifyAccount);
}
