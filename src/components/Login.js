import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import logo from '../images/logo192.png'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    setOpen(true);

    // Delay navigation to home page
    setTimeout(() => {
      navigate('/home'); // Navigate to home after 4 seconds
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', p: 2, mt: 10 }}>
        <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} /> {/* Logo Image */}
        <TextField
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2, width: 300 }}
        />
        <TextField
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, width: 300 }}
        />
        <Button type='submit' variant='outlined' onClick={handleClick}>Submit</Button>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert severity='success'>Login successfully</Alert>
        </Snackbar>
        <Box sx={{ display: 'flex', direction: 'row' }}>
          <Link to='/register' underline='none' sx={{ mt: 2, cursor: 'pointer' }}>
            Don't have an account? Register here.
          </Link>
        </Box>
      </Box>
    </div>
  );
}
