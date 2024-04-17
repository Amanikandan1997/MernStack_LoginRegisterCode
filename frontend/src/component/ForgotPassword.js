// components/ForgotPassword.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    try {
      // Send a request to the backend to initiate the password reset process
      await axios.post('http://localhost:8000/forgot-password', { email });
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Failed to send reset email.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
          Forgot Password
        </Typography>
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword}>
            Reset Password
          </Button>
        </form>
        <ToastContainer />
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
