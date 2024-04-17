// components/Register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
const Register = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', formData);
    
    
      // Delay displaying success toast after navigating
      setTimeout(() => {
        toast.success('Registration successful! Please login.');
      }, 100); // Adjust the delay time as needed // Display success toast
      console.log(response.data);
     // Reload the page after successful registration

     navigate('/login'); // Navigate to login page after successful registration
   
    } catch (error) {
        console.error(error);
        toast.error('Registration failed. Please try again.'); // Display error toast
    }
  };

  return (
    <div className='body'>
    <Container maxWidth="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 300 }}>
        <Typography variant="h4" gutterBottom style={{display:"flex", justifyContent:"center"}} >
          Register
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ marginBottom: 6 }}
            
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: 6 ,}}
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
            style={{ marginBottom: 6 }}
          /><br/><br/><br/>
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
          </Button>

          <br/><br/><br/>
          <Link to="/login" style={{textDecoration: 'none', color:'black',justifyContent: "center", display:"flex"}} >Al
          

          Already have an account? <span style={{color:"blue"}}>Login here</span>

        
          </Link>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
    </div>
  );
};

export default Register;
