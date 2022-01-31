import React from "react";

// reactstrap components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface props {
  status: boolean;
  toggleModal: any;
  body: string;
  yesHandler: any;
  type?: string;
}
export default function YesNoModal(props: props) {
  const { status, toggleModal, body, yesHandler, type } = props;

  let modalHeaderClassName = "";
  if (type === "danger") {
    modalHeaderClassName = "bg-danger text-white";
  } else if (type === "warning") {
    modalHeaderClassName = "bg-warning text-white";
  }
  return (
    <Modal isOpen={status} toggle={toggleModal}>
      <ModalHeader className={modalHeaderClassName} toggle={toggleModal}>
        Confirmation
      </ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        {" "}
        <Button onClick={toggleModal}>No</Button>
        <Button
          color="primary"
          onClick={() => {
            yesHandler();
            toggleModal();
          }}
        >
          Yes
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}
