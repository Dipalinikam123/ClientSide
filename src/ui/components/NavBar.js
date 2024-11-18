import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginModel from "../model/LoginModel";
import RegisterModel from "../model/RegisterModel";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function NavBar({ logModal, logToggle, regModal, regToggle, registerForm, setRegisterForm, setLoginForm, loginForm, setToken, token, registerUserHandler, loginUserHandler, errors,
  setErrors, setPasswordError, setEmailError, passwordError, emailError, forgetPassword }) {
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
        forgetPassword={forgetPassword}
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {token ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <CgProfile size={26} role="button" onClick={() => navigate('/profile')} />
                <Button variant="contained" color="error" onClick={logOutHandler}>
                  LogOut
                </Button>
              </Box>
            ) : (
              <Button variant="contained" color="error" onClick={loginHandler}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
