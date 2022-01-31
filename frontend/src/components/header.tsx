import React from "react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../actions";
import { useGetUserInfo } from "../hooks";
interface props {
  fullName: string;
}
export default function Header(props: props) {
  const dispatch = useDispatch();

  const userInfo = useGetUserInfo();
  const logoutButtonHandler = () => {
    dispatch(logout());
  };
  return (
    <Row className=" justify-content-center bg-dark">
      <Col className="mt-1">
        <h2
          className="display-3 text-start  text-light "
          style={{ marginLeft: "7%" }}
        >
          Simply Contacts
        </h2>
      </Col>
      <Col className="justify-content-end text-end align-self-center text-white pe-5 ">
        {userInfo.email && (
          <div className="d-flex justify-content-end">
            <div className=" me-3">
              <h4>Welcome {userInfo.full_name}!</h4>
              <p className="text-secondary">{userInfo.email}</p>
            </div>

            <Button
              color="danger"
              className="btn-sm h-50 align-self-center"
              outline
              onClick={logoutButtonHandler}
            >
              Logout
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
}
