import { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  Button,
} from 'reactstrap';
import LoginModel from '../model/LoginModel';
import RegisterModel from '../model/RegisterModel';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function NavBar({ logModal, logToggle, regModal, regToggle, registerForm, setRegisterForm, setLoginForm, loginForm, setToken, token, registerUserHandler, loginUserHandler,errors,setErrors}) {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, [logModal, regModal]);


  const logOutHandler = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  return (
    <div>
      <LoginModel modal={logModal} toggle={logToggle} regToggle={regToggle} loginForm={loginForm} setLoginForm={setLoginForm} loginUserHandler={loginUserHandler} />
      <RegisterModel modal={regModal} toggle={regToggle} logToggle={logToggle} registerForm={registerForm} setRegisterForm={setRegisterForm} registerUserHandler={registerUserHandler} errors={errors} setErrors={setErrors}/>
      <Navbar expand='lg'>
        <NavbarBrand href="/">Teams</NavbarBrand>
        <Collapse navbar>
          <Nav className="me-auto" navbar>
          </Nav>
          {
            token ? <Button className='bg-danger border-danger' onClick={logOutHandler}>LogOut</Button> : <Button className='bg-danger border-danger' onClick={logToggle}>Login</Button>
          }

        </Collapse>
      </Navbar>
    </div>
  );
}

