import { takeEvery, call, putResolve } from "redux-saga/effects";
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
  userExist: boolean;
  user?: any;
}

function* loginUser(data: any) {
  const { email, navigate } = data.payload;

  try {
    const existingUser: ResponseGenerator = yield call(
      api,
      `/api/auth?email=${email}`
    );
    if (existingUser.userExist === true) {
      if (existingUser.user?.verified === true) {
        const loggedUser: ResponseGenerator = yield call(
          api,
          `/api/auth/login`,
          "POST",
          data.payload
        );
        if (loggedUser.success === true) {
          const user = loggedUser.user;
          delete user.password;

          toast.success("Successfully logged in");
          yield putResolve(actions.setUserInfo(user));

          let user_data_stringify = JSON.stringify(user);
          //storing session
          window.sessionStorage.setItem("user_data", user_data_stringify);
          //local storage
          localStorage.setItem("user_data", user_data_stringify);
          //redirecting user to home page
          navigate("/contact-list");
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        toast.error("Please confirm the email");
        var opened: any = window.open("");
        opened.document.write(
          `<html><head><title>Simply Contacts</title></head><body><h2>Hello Shubham,</h2><p> Welcome to Simply Contacts. Please confirm your account </p><a href=/verify-account?usertoken=${existingUser.user?.verification_token}&email=${existingUser.user?.email}>Confirm your account </a><p>Thanks </p></body></html>`
        );
      }
    } else {
      toast.error("Email is not registered");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
}
function* logoutUser(data: any) {
  try {
    toast.success("Successfully logged out");
    //clearing session
    sessionStorage.clear();

    //clearing storage
    localStorage.clear();

    //@ts-ignore
    window.location = "/login";
  } catch (error) {
    toast.error("Something went wrong");
  }
}

export default function* loginSaga() {
  yield takeEvery(ACTIONS.LOGIN, loginUser);
  yield takeEvery(ACTIONS.LOGOUT, logoutUser);
}
