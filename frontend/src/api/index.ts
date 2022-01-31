import { call, select } from "redux-saga/effects";

export function* api(
  apiUri: string,
  // token: string = "",
  method: string = "GET",
  body: any = null
) {
  const { userInfo } = yield select((state) => state);

  const headers: any = {};
  let response: any;
  const token = userInfo?.token;
  headers["Content-Type"] = "application/json";
  if (token) {
    headers["x-access-token"] = token;
  }
  if (body) {
    //@ts-ignore
    response = yield call(fetch, apiUri, {
      method: method,
      body: JSON.stringify(body),
      headers,
    });
  } else {
    //@ts-ignore
    response = yield call(fetch, apiUri, {
      method: method || "GET",
      headers,
      // credentials: "include",
    });
  }
  //@ts-ignore
  const json = yield call(retrieveJSON, response);
  return json;
}

export function retrieveJSON(response: { json: () => any }) {
  return response.json();
}
