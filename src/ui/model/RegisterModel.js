import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';



function RegisterModel({ modal, toggle, logToggle, setRegisterForm, registerForm, registerUserHandler ,errors}) {
  

  const loginHandler = () => {
    toggle()
    logToggle()
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="firstname">FirstName</Label>
              <Input
                type="text"
                id="firstname"
                placeholder="Enter Your FirstName"
                value={registerForm?.firstName}
                onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                invalid={errors?.nameError}
              />
              <FormFeedback>Name is required.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="lastname">LastName</Label>
              <Input
                type="text"
                id="lastname"
                placeholder="Enter Your LastName"
                value={registerForm?.lastName}
                onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                invalid={errors?.nameError}
              />
              <FormFeedback>Name is required.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={registerForm?.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                invalid={errors?.emailError}
              />
              <FormFeedback>Email is invalid.</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                value={registerForm?.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                invalid={errors?.passwordError}
              />
              <FormFeedback>Password must be at least 6 characters.</FormFeedback>
            </FormGroup>
            <FormGroup tag="fieldset">
              <Label>Gender</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                    checked={registerForm?.gender === 'Male'}
                  />{' '}
                  Male
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                    checked={registerForm?.gender === 'Female'}
                  />{' '}
                  Female
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
          <p>Already Have Account..? <span className='text-primary' role='button' onClick={loginHandler}>Login</span></p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={registerUserHandler}>
            Register
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default RegisterModel;