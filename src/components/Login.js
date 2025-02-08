import { Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import logo from '../images/logo192.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password

  const handleClick = () => {
    console.log('Username:', username); // Log username to console
    console.log('Password:', password); // Log password to console
    setOpen(true);
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
          value={username} // Bind value to state
          onChange={(e) => setUsername(e.target.value)} // Update state on change
          sx={{ mb: 2, width: 300 }}
        />
        <TextField
          label='Password'
          type='password'
          value={password} // Bind value to state
          onChange={(e) => setPassword(e.target.value)} // Update state on change
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
