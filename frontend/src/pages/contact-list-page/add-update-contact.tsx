import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addContact, updateContact } from "../../actions";
import { YesNoModal } from "../../components";
import { rules } from "../../helper/validation";
import { useGetUserInfo } from "../../hooks";
// reactstrap components
import { FormGroup, Input, Col, Label } from "reactstrap";

type FormData = {
  fullName: string;
  email: string;
  phone: number | string;
  contactid?: number;
  phoneid: number;
};
export default function AddUpdateContact(props: any) {
  const dispatch = useDispatch();
  const userInfo = useGetUserInfo();
  const [duplicateContactModalStatus, setDuplicateContactModalStatus]: any =
    useState({ contact: undefined, status: false, existingContact: undefined });

  //store imports
  const selectedContacForEdit: any = useSelector(
    (state: any) => state.selectedContacForEdit
  );
  const contacts: any = useSelector((state: any) => state.filteredContacts);
  const allContacts: any = useSelector((state: any) => state.contacts);

  const addUpdateFormMode: any = useSelector(
    (state: any) => state.addUpdateFormMode
  );

  //FORM SETUP
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },

    clearErrors,
    watch,
  } = useForm<FormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const createDuplicateContactButtonClickHandler = () => {
    dispatch(
      addContact({
        result: { ...duplicateContactModalStatus.contact, userId: userInfo.id },
        contacts: allContacts,
      })
    );
  };

  const toggleDuplicateModalStatus = (contact?: any, existingContact?: any) => {
    if (duplicateContactModalStatus.status === true) {
      setDuplicateContactModalStatus({
        status: false,
        contact: undefined,
        existingContact: undefined,
      });
    } else if (contact) {
      setDuplicateContactModalStatus({
        status: true,
        contact,
        existingContact,
      });
    }
  };
  //FORM SUBMIT HANDLER
  const onSubmit: any = (data: FormData) => {
    // setError("phone", { message: "" });
    clearErrors();
    if (addUpdateFormMode === "EDIT") {
      //updating contact
      dispatch(updateContact({ result: { ...data }, contacts: allContacts }));
    } else if (addUpdateFormMode === "ADD") {
      const found = contacts.find(
        (contact: { email: { toLowerCase: () => any }; phone: string }) =>
          contact.phone === data.phone ||
          contact.email.toLowerCase() === data.email.toLowerCase()
      );
      if (!found) {
        //creating new contact
        dispatch(
          addContact({
            result: { ...data, userId: userInfo.id },
            contacts: allContacts,
          })
        );
      } else {
        //Found duplicate contact
        toggleDuplicateModalStatus(data, found);
      }
    }
  };

  useEffect(() => {
    if (addUpdateFormMode === "ADD") {
      //Reseting values on ADD MODE
      setValue("fullName", "");
      setValue("email", "");
      setValue("phone", "");
    } else {
      //Setting values on EDIT MODE
      setValue("fullName", selectedContacForEdit.full_name);
      setValue("email", selectedContacForEdit.email);
      setValue("phone", selectedContacForEdit.phone);

      setValue("contactid", selectedContacForEdit.contact_id, {
        shouldDirty: true,
      });

      setValue("phoneid", selectedContacForEdit.phone_id, {
        shouldDirty: true,
      });

      // setValue('name', 'value', { shouldDirty: true })
    }
  }, [selectedContacForEdit]);

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <h3>Add New Contact</h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        defaultValue={selectedContacForEdit}
      >
        <FormGroup row>
          <Label className="text-start" size="lg" sm={2}>
            Name<span className="text-danger">*</span>
          </Label>
          <Col sm={10}>
            <Controller
              rules={{ required: true }}
              control={control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  bsSize="lg"
                  type="text"
                  placeholder="Enter full name"
                  required
                />
              )}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="text-start" size="lg" sm={2}>
            Email<span className="text-danger">*</span>
          </Label>
          <Col sm={10}>
            <Controller
              control={control}
              name="email"
              rules={
                typeof rules.email === "function" ? rules.email(watch) : rules
              }
              render={({ field }) => (
                <Input
                  {...field}
                  bsSize="lg"
                  type="email"
                  placeholder="Enter email"
                  required
                />
              )}
            />
            <p className="text-danger">{errors["email"]?.message}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label className="text-start" size="lg" sm={2}>
            Phone Number<span className="text-danger">*</span>
          </Label>
          <Col sm={10}>
            <Controller
              control={control}
              name="phone"
              rules={
                typeof rules.phone === "function" ? rules.phone(watch) : rules
              }
              render={({ field }) => (
                <Input
                  {...field}
                  bsSize="lg"
                  type="text"
                  placeholder="Enter phone number"
                  required
                />
              )}
            />
            <p className="text-danger">{errors["phone"]?.message}</p>
          </Col>
        </FormGroup>

        <Input
          type="submit"
          className="btn btn-primary w-100 outline"
          value={addUpdateFormMode === "EDIT" ? "Update" : "Add"}
        />
      </form>
      {/* Duplicate modal starts */}
      {duplicateContactModalStatus.status === true && (
        <YesNoModal
          toggleModal={toggleDuplicateModalStatus}
          status={duplicateContactModalStatus.status}
          body={`Duplicate contact found for ${duplicateContactModalStatus.existingContact?.full_name}. Do you still want to add the contact?`}
          yesHandler={createDuplicateContactButtonClickHandler}
          type="warning"
        />
      )}{" "}
    </>
  );
}
