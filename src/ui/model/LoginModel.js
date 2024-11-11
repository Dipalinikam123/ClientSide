import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function LoginModel({ modal, toggle, regToggle, setLoginForm, loginForm, loginUserHandler }) {

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const logValidateForm = () => {
    setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginForm?.email));
    setPasswordError(loginForm?.password?.length < 6);
  };


  const handleSubmit = () => {
    logValidateForm();

    if (!emailError && !passwordError) {
      loginUserHandler()
    }
  };

  const registerHandler = () => {
    toggle()
    regToggle()
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} >
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
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
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
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                invalid={passwordError}
              />
              <FormFeedback>Password must be at least 6 characters.</FormFeedback>
            </FormGroup>
          </Form>
          <p>Don't Have Account..? <span className='text-primary' role='button' onClick={registerHandler}>Register</span></p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Login
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginModel;