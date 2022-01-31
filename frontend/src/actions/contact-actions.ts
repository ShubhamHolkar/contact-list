import * as ACTIONS from "../action-types";

export const fetchContactList = () => {
  return {
    type: ACTIONS.FETCH_CONTACT_LIST,
  };
};
export const setContactList = (data: [any]) => {
  return {
    type: ACTIONS.SAVE_CONTACT_LIST,
    payload: data,
  };
};

export const setAddContactFormMode = () => {
  return {
    type: ACTIONS.SET_ADD_CONTACT_FORM_MODE,
  };
};

export const addContact = (data: any) => {
  return {
    type: ACTIONS.ADD_CONTACT,
    payload: data,
  };
};

export const updateContact = (data: any) => {
  return {
    type: ACTIONS.UPDATE_CONTACT,
    payload: data,
  };
};
export const selectContactToUpdate = (data: any) => {
  return {
    type: ACTIONS.SELECT_CONTACT_TO_UPDATE,
    payload: data,
  };
};

export const filterContactList = (searchText: string) => {
  return {
    type: ACTIONS.FILTER_CONTACT_LIST,
    payload: searchText,
  };
};
export const deleteContact = (data: any) => {
  return {
    type: ACTIONS.DELETE_CONTACT,
    payload: data,
  };
};
