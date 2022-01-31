import * as ACTIONS from "../action-types";
const contactsFilter =
  (text: any) =>
  (item: { full_name: string; email: string; phone: number }) => {
    if (item.full_name && item.full_name.toLowerCase().indexOf(text) !== -1) {
      return item;
    } else if (item.email && item.email.toLowerCase().indexOf(text) !== -1) {
      return item;
    } else if (
      item.phone &&
      item.phone.toString().toLowerCase().indexOf(text) !== -1
    ) {
      return item;
    }
  };

const initialState: any = {
  userInfo: {},
  contacts: [],
  filteredContacts: [],
  selectedContacForEdit: {},
  addUpdateFormMode: "ADD",
  searchText: "",
};
const reducer = (
  state: any = { ...initialState },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ACTIONS.SET_USER_INFO:
      var newState = { ...state };
      newState.userInfo = action.payload;
      return newState;

    case ACTIONS.FETCH_CONTACT_LIST:
      //called to get  all contacts
      return state;
    case ACTIONS.SAVE_CONTACT_LIST:
      //saving contact list got from API
      var newState = { ...state };
      newState.contacts = action.payload;
      newState.filteredContacts = action.payload;

      if (newState.searchText.length > 0) {
        newState.filteredContacts = action.payload.filter(
          contactsFilter(newState.searchText.trim().toLowerCase())
        );
      }
      return newState;

    case ACTIONS.ADD_CONTACT:
      //called when user clicks on add contact button
      var newState = { ...state };
      return newState;

    case ACTIONS.SET_ADD_CONTACT_FORM_MODE:
      //called when user clicks on add new contact button
      var newState = { ...state };
      //clearing out edit contact data, updating form update and clearing selected contact for edit mode
      newState.selectedContacForEdit = {};
      newState.addUpdateFormMode = "ADD";

      newState.contacts = newState.contacts.map(
        (contact: { contact_id: any; editMode: boolean }) => {
          contact.editMode = false;
          return contact;
        }
      );
      newState.filteredContacts = newState.filteredContacts.map(
        (contact: { contact_id: any; editMode: boolean }) => {
          contact.editMode = false;
          return contact;
        }
      );

      return newState;

    case ACTIONS.FILTER_CONTACT_LIST:
      var newState = { ...state };
      const searchText = action.payload;
      newState.searchText = searchText;
      newState.filteredContacts = newState.contacts.filter(
        contactsFilter(searchText.trim().toLowerCase())
      );
      return newState;

    case ACTIONS.SELECT_CONTACT_TO_UPDATE:
      //called when user selected any contact for edit/update
      var newState = { ...state };
      const selectedContact = action.payload;
      newState.filteredContacts = newState.filteredContacts.map(
        (contact: { contact_id: any; editMode: boolean }) => {
          if (contact.contact_id === selectedContact.contact_id) {
            contact.editMode = true;
            newState.selectedContacForEdit = contact;
            newState.addUpdateFormMode = "EDIT";
          } else {
            contact.editMode = false;
          }
          return contact;
        }
      );
      newState.contacts = newState.contacts.map(
        (contact: { contact_id: any; editMode: boolean }) => {
          if (contact.contact_id === selectedContact.contact_id) {
            contact.editMode = true;
            newState.selectedContacForEdit = contact;
            newState.addUpdateFormMode = "EDIT";
          } else {
            contact.editMode = false;
          }
          return contact;
        }
      );
      return newState;
    case ACTIONS.UPDATE_CONTACT:
      //called when user clicks on update contact button
      var newState = { ...state };
      return newState;

    case ACTIONS.DELETE_CONTACT:
      //called when user clicks on delete contact button

      var newState = { ...state };

      return newState;

    default:
      return state;
  }
};

export default reducer;
