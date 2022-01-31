import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { rules } from "../helper/validation";
import { register as registerUser } from "../actions";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Label,
  CardTitle,
} from "reactstrap";

type FormData = {
  fullName: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    clearErrors,
  } = useForm<FormData>();
  const onSubmit: any = (data: FormData) => {
    clearErrors();
    dispatch(registerUser({ ...data, navigate }));
  };
  let navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="7" className="mt-5">
          <div className="text-center"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup row>
              <Label className="text-start" for="fullName" size="lg" sm={3}>
                Full Name <span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Controller
                  control={control}
                  name="fullName"
                  rules={{ required: true }}
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
              <Label className="text-start" for="email" size="lg" sm={3}>
                Email<span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Controller
                  control={control}
                  name="email"
                  rules={
                    typeof rules.email === "function"
                      ? rules.email(watch)
                      : rules
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
              <Label className="text-start" for="password" size="lg" sm={3}>
                Password<span className="text-danger">*</span>
              </Label>
              <Col sm={9}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      bsSize="lg"
                      type="password"
                      placeholder="Enter password"
                      required
                    />
                  )}
                />
              </Col>
            </FormGroup>
            <Input
              type="submit"
              className="btn btn-primary w-100 outline"
              value="Register"
            />
          </form>

          <p className="text-mute align-center  text-end">
            <Button
              color="link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already have an account? Login here
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
