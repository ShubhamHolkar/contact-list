import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGravatar } from "../../helper";
import AddUpdateContact from "./add-update-contact";
import { YesNoModal } from "../../components";
import { useGetContactList } from "../../hooks";
import {
  fetchContactList,
  selectContactToUpdate,
  setAddContactFormMode,
  filterContactList,
  deleteContact,
} from "../../actions";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";

export default function ContactList() {
  const dispatch = useDispatch();
  const { contacts, allContacts } = useGetContactList();
  //store imports
  const addUpdateFormMode: any = useSelector(
    (state: any) => state.addUpdateFormMode
  );
  //local states
  const [deleteModalDetails, setDeleteModalDetails]: any = useState({
    status: false,
    contact: null,
  });

  useEffect(() => {
    dispatch(fetchContactList());
  }, []);

  const addNewButtonClickHandler = () => {
    dispatch(setAddContactFormMode());
  };
  const editButtonClickHandler = (contact: {
    id: number;
    full_name: string;
    email: string;
    phone: number;
    editMode?: boolean | undefined;
  }) => {
    dispatch(selectContactToUpdate(contact));
  };

  const searchTextHandler = (event: any) => {
    dispatch(filterContactList(event.target.value));
  };

  const toggleDeleteModalStatus = (contact?: any) => {
    if (deleteModalDetails.status === true) {
      setDeleteModalDetails({ status: false, contact: null });
    } else if (contact) {
      setDeleteModalDetails({ status: true, contact });
    }
  };

  const deleteButtonClickHandler = () => {
    dispatch(
      deleteContact({
        contactIdToDelete: deleteModalDetails.contact,
        contacts: allContacts,
      })
    );
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between">
        <Col lg="5" className="mt-5">
          <div className="d-flex justify-content-between mb-2">
            <h3>Contact List</h3>
            <Button
              size="sm"
              color="primary"
              onClick={addNewButtonClickHandler}
            >
              Add New
            </Button>
          </div>
          <Input
            bsSize="sm"
            type="text"
            placeholder="Search...."
            className="mb-2"
            onChange={searchTextHandler}
          />
          <div className="contact-list">
            {contacts.map(
              (contact: {
                id: number;
                full_name: string;
                email: string;
                phone: number;
                editMode?: boolean;
              }) => {
                return (
                  <Card
                    key={contact.id}
                    className={
                      contact.editMode === true
                        ? "bg-dark  text-white mb-2 shadow"
                        : "mb-2 shadow"
                    }
                  >
                    <CardBody className="p-1">
                      <div className="d-flex flex-row ">
                        <img
                          height={50}
                          width={50}
                          className="rounded-circle align-self-center"
                          src={getGravatar(contact.email)}
                          alt=""
                        />

                        <div className="d-flex flex-column ms-3 w-100">
                          <span>
                            <Label className="text-mute">Name:</Label>{" "}
                            <span className="">{contact.full_name}</span>
                          </span>
                          <span>
                            <Label>Email:</Label>{" "}
                            <span className="">{contact.email}</span>
                          </span>
                          <span>
                            <Label>Number:</Label>{" "}
                            <span className="">{contact.phone}</span>
                          </span>
                        </div>

                        <div className="flex-shrink-1 align-self-center">
                          <Button
                            size="sm"
                            color="secondary"
                            className="mb-2 w-100"
                            onClick={() => editButtonClickHandler(contact)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            className="mb-2 w-100"
                            onClick={() => toggleDeleteModalStatus(contact)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              }
            )}
          </div>
          {contacts.length === 0 && (
            <p className="text-secondary text-center">
              You dont have any contacts yet !!!
            </p>
          )}
        </Col>

        <Col lg="5" className="mt-5">
          <AddUpdateContact />
        </Col>
      </Row>
      {/* Delete Modal starts   */}
      {deleteModalDetails.status === true && (
        <YesNoModal
          toggleModal={toggleDeleteModalStatus}
          status={deleteModalDetails.status}
          body={`Are you sure you want to delete ${deleteModalDetails.contact?.full_name}'s contact?`}
          yesHandler={deleteButtonClickHandler}
          type="danger"
        />
      )}
    </Container>
  );
}
