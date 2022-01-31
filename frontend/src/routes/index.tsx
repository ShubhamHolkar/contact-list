import React, { Component, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGetUserInfo } from "../hooks";
import { Loader, Header } from "../components";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { get_userInfo } from "../helper";
import { setUserInfo } from "../actions";

//Import Components
const LoginPage = React.lazy(() => import("../pages/login-page"));
const RegisterPage = React.lazy(() => import("../pages/register-page"));
const VerifyAccount = React.lazy(() => import("../pages/verify-account"));
const ContactList = React.lazy(
  () => import("../pages/contact-list-page/contact-list")
);
export default function CustomRoutes() {
  const dispatch = useDispatch();
  const userInfo = useGetUserInfo();

  useEffect(() => {
    if (!userInfo.email) {
      //If user does hard refresh then checking for useinfo on session
      const sessionUserInfo = get_userInfo();
      dispatch(setUserInfo(sessionUserInfo));
    }
  }, []);

  return (
    <>
      <Header fullName="shubham holkar" />
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            {userInfo.hasOwnProperty("email") && (
              <Route path="/contact-list" element={<ContactList />} />
            )}
            {!userInfo.hasOwnProperty("email") && (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            )}
            <Route path="/verify-account" element={<VerifyAccount />} />
            <Route
              path="*"
              element={
                <Navigate to={userInfo.email ? "/contact-list" : "/login"} />
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}
