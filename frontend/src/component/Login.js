// components/Login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper} from '@material-ui/core';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const Navigate  = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email) {
      toast.error('email is required.');
      return;
    }

    if (!password) {
      toast.error('Password is required.');
      return;
    
    }
    try {
    // Assuming your server returns some data upon successful login
      const response = await axios.post('http://localhost:8000/login', formData);
      console.log(response.data);
      toast.success('Login successful!');
      const { token } = response.data;
      // Assuming your backend returns a token upon successful login
      localStorage.setItem('token', token); // Store token in local storage
      
      // Navigate to the dashboard upon successful login
      Navigate('/dash');
     
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check your credentials.'); // Display error toast
    }
  };
  const handleForgotPassword = () => {
    // Implement your forgot password functionality here
    // Redirect or show a modal for password recovery
    console.log("Forgot password clicked");
  };


  return (
    <div className='body'>
    <Container maxWidth="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 300 }}>
      <Typography variant="h4" gutterBottom style={{display:"flex", justifyContent:"center"}}>
        Login
      </Typography>
      <form>
        <TextField
          label="email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        /><br/><br/>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button><br/><br/>
        <Link  to="/forgot" style={{textDecoration: 'none', color:'black',justifyContent: "center", display:"flex"}}>
            Forgot Password
          </Link><br/>
          
        <Link to="/" style={{textDecoration: 'none', color:'black',justifyContent: "center", display:"flex"}} >
          

        Don't have an account? <span style={{color:"blue"}}>Register here</span>

        
          </Link>
      </form>
      <ToastContainer/>
      </Paper>
    </Container>
    </div>
  );
};

export default Login;
