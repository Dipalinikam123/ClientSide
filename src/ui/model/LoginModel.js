import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
} from "@mui/material";
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
  forgetPassword,
}) {
  const [pwdModal, setPwdModal] = useState(false);

  const pwdToggle = () => {
    toggle();
    setPwdModal(!pwdModal);
  };

  const registerHandler = () => {
    setErrors({ nameError: false, emailError: false, passwordError: false });
    toggle();
    regToggle();
  };

  return (
    <div>
      <ForgotPassword toggle={pwdToggle} modal={pwdModal} setPwdModal={setPwdModal} forgetPassword={forgetPassword} />
      
      <Modal open={modal} onClose={toggle}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Login Form
          </Typography>
          
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              type="email"
              placeholder="Enter Your Email"
              value={loginForm?.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              error={emailError}
              helperText={emailError && "Email is invalid."}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              type="password"
              placeholder="Enter Your Password"
              value={loginForm?.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              error={passwordError}
              helperText={passwordError && "Password must be at least 6 characters."}
            />
          </FormControl>
          
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Typography
              variant="body2"
              color="primary"
              component="span"
              sx={{ cursor: "pointer" }}
              onClick={registerHandler}
            >
              Register
            </Typography>
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            component="span"
            sx={{ cursor: "pointer", display: "block", mt: 1 }}
            onClick={pwdToggle}
          >
            Forgot Password?
          </Typography>
          
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" color="primary" onClick={loginUserHandler}>
              Login
            </Button>
            <Button variant="outlined" color="secondary" onClick={toggle} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginModel;
