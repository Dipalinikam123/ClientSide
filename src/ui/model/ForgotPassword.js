import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';

function ForgotPassword({ toggle, modal, setPwdModal, forgetPassword }) {
  const [email, setEmail] = useState('');

  const forgotPwd = () => {
    setPwdModal(false);
    forgetPassword(email);
  };

  return (
    <Modal open={modal} onClose={toggle}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        <TextField
          type="email"
          label="Enter your email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={forgotPwd}>
            Send link
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setPwdModal(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ForgotPassword;
