import React from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

function RegisterModel({
  modal,
  toggle,
  logToggle,
  setRegisterForm,
  registerForm,
  registerUserHandler,
  errors,
}) {

  const loginHandler = () => {
    toggle();
    logToggle();
  };

  return (
    <div>
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
            Register Model
          </Typography>

          <TextField
            label="First Name"
            type="text"
            fullWidth
            value={registerForm?.firstName}
            onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
            error={Boolean(errors?.nameError)}
            helperText={errors?.nameError && 'Name is required.'}
            margin="normal"
          />

          <TextField
            label="Last Name"
            type="text"
            fullWidth
            value={registerForm?.lastName}
            onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
            error={Boolean(errors?.nameError)}
            helperText={errors?.nameError && 'Name is required.'}
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            value={registerForm?.email}
            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            error={Boolean(errors?.emailError)}
            helperText={errors?.emailError && 'Email is invalid.'}
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={registerForm?.password}
            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            error={Boolean(errors?.passwordError)}
            helperText={errors?.passwordError && 'Password must be at least 6 characters.'}
            margin="normal"
          />

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              value={registerForm?.gender}
              onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
              row
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Typography
              variant="body2"
              color="primary"
              component="span"
              sx={{ cursor: "pointer" }}
              onClick={loginHandler}
            >
              Login
            </Typography>
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" color="primary" onClick={registerUserHandler}>
              Register
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

export default RegisterModel;
