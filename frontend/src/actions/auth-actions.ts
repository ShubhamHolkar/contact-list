import * as ACTIONS from "../action-types";
export const login = (data: any) => {
  return {
    type: ACTIONS.LOGIN,
    payload: data,
  };
};
export const logout = () => {
  return {
    type: ACTIONS.LOGOUT,
  };
};
export const setUserInfo = (data: any) => {
  return {
    type: ACTIONS.SET_USER_INFO,
    payload: data,
  };
};

export const register = (data: any) => {
  return {
    type: ACTIONS.REGISTER,
    payload: data,
  };
};

export const verifyAccount = (data: any) => {
  return {
    type: ACTIONS.VERIFY_ACCOUNT,
    payload: data,
  };
};
