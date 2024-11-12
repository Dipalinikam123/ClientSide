import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import ForgotPassword from "./ForgotPassword";

function LoginModel({
  modal,
  toggle,
  regToggle,
  setLoginForm,
  loginForm,
  loginUserHandler,
  setErrors,
  passwordError,
  emailError,
}) {

  const [pwdModal, setPwdModal] = useState(false);

  const pwdToggle = () => setPwdModal(!pwdModal);

  const registerHandler = () => {
    setErrors({ nameError: false, emailError: false, passwordError: false });
    toggle();
    regToggle();
  };
  return (
    <div>
      <ForgotPassword toggle={pwdToggle} modal={pwdModal}/>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login Form</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={loginForm?.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                invalid={emailError}
              />
              <FormFeedback>Email is invalid.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                value={loginForm?.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                invalid={passwordError}
              />
              <FormFeedback>
                Password must be at least 6 characters.
              </FormFeedback>
            </FormGroup>
          </Form>
          <p>
            Don't Have Account..?{" "}
            <span
              className="text-primary"
              role="button"
              onClick={registerHandler}
            >
              Register
            </span>
          </p>
          <p className="text-primary" role="button" onClick={pwdToggle}>Forgot Password..?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={loginUserHandler}>
            Login
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginModel;
