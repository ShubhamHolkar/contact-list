import { takeEvery, call } from "redux-saga/effects";
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
  verification_token?: string;
  email?: string;
}

function* registerUser(data: any) {
  const { email, navigate } = data.payload;
  try {
    const existingUser: ResponseGenerator = yield call(
      api,
      `/api/auth?email=${email}`
    );
    if (existingUser.userExist === false) {
      const registeredUser: ResponseGenerator = yield call(
        api,
        `/api/auth/register`,
        "POST",
        data.payload
      );
      if (registeredUser.success === true) {
        const user = registeredUser.user;
        toast.success("Registered successfully, Please confirm email", {
          duration: 10000,
        });
        navigate("/login");
        var opened: any = window.open("");
        opened.document.write(
          `<html><head><title>Simply Contacts</title></head><body><h2>Hello Shubham,</h2><p> Welcome to Simply Contacts. Please confirm your account </p><a href=/verify-account?usertoken=${user.verification_token}&email=${user.email}>Confirm your account </a><p>Thanks </p></body></html>`
        );
      }
    } else {
      toast.error("Email is already registered");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* registerSaga() {
  yield takeEvery(ACTIONS.REGISTER, registerUser);
}
