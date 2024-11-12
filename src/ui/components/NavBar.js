import { useEffect, useState } from "react";
import { Collapse, Navbar, NavbarBrand, Nav, Button } from "reactstrap";
import LoginModel from "../model/LoginModel";
import RegisterModel from "../model/RegisterModel";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  logModal,
  logToggle,
  regModal,
  regToggle,
  registerForm,
  setRegisterForm,
  setLoginForm,
  loginForm,
  setToken,
  token,
  registerUserHandler,
  loginUserHandler,
  errors,
  setErrors,
  setPasswordError,
  setEmailError,
  passwordError,
  emailError,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [logModal, regModal]);

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const loginHandler = () => {
    setEmailError(false);
    setPasswordError(false);
    setLoginForm({
      email: '',
      password: ''
    })
    logToggle();
  };

  return (
    <div>
      <LoginModel
        modal={logModal}
        toggle={loginHandler}
        regToggle={regToggle}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        loginUserHandler={loginUserHandler}
        setErrors={setErrors}
        passwordError={passwordError}
        emailError={emailError}
      />
      <RegisterModel
        modal={regModal}
        toggle={regToggle}
        logToggle={loginHandler}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        registerUserHandler={registerUserHandler}
        errors={errors}
      />
      <Navbar expand="lg">
        <NavbarBrand href="/">Teams</NavbarBrand>
        <Collapse navbar>
          <Nav className="me-auto" navbar></Nav>
          {token ? (
            <div className="d-flex align-items-center justify-content-center gap-3">
              <CgProfile size={26} role="button" onClick={()=>navigate('/profile')}/>
              <Button className="bg-danger border-danger" onClick={logOutHandler}>
                LogOut
              </Button>
            </div>
          ) : (
            <Button className="bg-danger border-danger" onClick={loginHandler}>
              Login
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}
