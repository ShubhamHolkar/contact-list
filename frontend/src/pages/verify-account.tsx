import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyAccount } from "../actions";
export default function VerifyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("usertoken");
    const email = searchParams.get("email");

    if (token) {
      dispatch(verifyAccount({ email, token, navigate }));
    }
  }, []);

  return null;
}
