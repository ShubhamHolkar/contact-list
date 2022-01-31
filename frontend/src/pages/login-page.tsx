import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions";

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";

type FormData = {
  fullName: string;
  email: string;
  password: string;
};
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormData>();
  const onSubmit: any = (data: FormData) => {
    dispatch(login({ ...data, navigate }));
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center me-0">
        <Col lg="7" className="mt-5">
          <div className="text-center"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup row>
              <Label className="text-start" for="email" size="lg" sm={2}>
                Email<span className="text-danger">*</span>
              </Label>
              <Col sm={10}>
                <Controller
                  control={control}
                  name="email"
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
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label className="text-start" for="password" size="lg" sm={2}>
                Password<span className="text-danger">*</span>
              </Label>
              <Col sm={10}>
                <Controller
                  control={control}
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
              value="Login"
            />
          </form>
          <p className="text-mute align-center  text-end">
            <Button
              color="link"
              onClick={() => {
                navigate("/register");
              }}
            >
              Don't have an account? Register here
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
