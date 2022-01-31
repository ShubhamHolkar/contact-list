import React from "react";

import { useSelector } from "react-redux";

export default function useGetContactList() {
  const contacts: any = useSelector((state: any) => state.filteredContacts);
  const allContacts: any = useSelector((state: any) => state.contacts);

  return { contacts, allContacts };
}
