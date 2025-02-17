import { Box, TextField, Button, Snackbar, Alert, Paper, Card } from '@mui/material';
import React, { useState } from 'react';
import logo from '../images/logo192.jpg'; // Adjust the path as necessary
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
      navigate('/dashboard'); // Navigate to home after 4 seconds
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='login'>
      <Paper elevation={5} sx={{m:4}}>
      {/* <Card sx={{width: '50%', display: 'flex', flexDirection: 'row', ml:40,mt: 5}}> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 15,mb: 2 }}>
       
        <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px', paddingTop: '20px' }} /> {/* Logo Image */}
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
        <Button type='submit' variant='outlined' onClick={handleClick}>Login</Button>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
        >
          <Alert severity='success'>Login successfully</Alert>
        </Snackbar>
        <Box sx={{ display: 'flex', direction: 'row',pb: 3 }}>
          <Link to='/register' underline='none' sx={{ mt: 2, cursor: 'pointer' }}>
            Don't have an account? Register here.
          </Link>
        </Box>
        
      </Box>
      {/* </Card> */}
      </Paper>
    </div>
  );
}
