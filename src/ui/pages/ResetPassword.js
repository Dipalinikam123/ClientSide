import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';

export default function ResetPassword({ logToggle }) {
  const { id, token } = useParams();
  const [resetPwd, setResetPwd] = useState({
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  console.log('-----id, token', id, token)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/verify-reset-token/${id}/${token}`);
        console.log('response ', response.data)
        toast('Token verified successfully', {
          autoClose: 1000,
        });
      } catch (error) {
        toast(error?.response?.data?.message, {
          autoClose: 1000,
        });
      }
    };

    verifyToken();
  }, [id, token]);

  const handleResetPassword = async () => {
    const { password, confirmPassword } = resetPwd;
    console.log('----password,confirmPassword', password, confirmPassword)
    if (password !== confirmPassword) {
      return toast("Passwords do not match", {
        autoClose: 1000,
      });
    }
    try {
      const response = await axios.post(`http://localhost:1337/verify-reset-token/${id}/${token}`, { password, confirmPassword });
      console.log('response ', response.data)
      navigate('/')
      logToggle()
      toast("Password reset successfully", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log('-----error', error?.response?.data?.message)
      toast(error?.response?.data?.message, {
        autoClose: 1000,
      });
    }
  };
  return (
    <Box display="flex" justifyContent="center" marginTop="100px" width="100%">
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <TextField type='password' id="standard-basic" label="Password" variant="standard" value={resetPwd?.password} onChange={(e) => setResetPwd({ ...resetPwd, password: e.target.value })} fullWidth
            margin="normal" required />
          <TextField type='password' id="standard-basic" label="Confirm Password" variant="standard" value={resetPwd?.confirmPassword} onChange={(e) => setResetPwd({ ...resetPwd, confirmPassword: e.target.value })} fullWidth
            margin="normal" required />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleResetPassword}>Reset Password</Button>

        </CardActions>
      </Card>
    </Box>
  )
}
