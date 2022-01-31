import React from "react";

import { useSelector } from "react-redux";

export default function useGetUserInfo() {
  const userInfo: any = useSelector((state: any) => state.userInfo);

  return userInfo;
}
