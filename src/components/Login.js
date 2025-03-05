import { Box, TextField, Button, Snackbar, Alert, Paper} from '@mui/material';
import React, { useState } from 'react';
import logo from '../images/logo192.jpg'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      const users = response.data;
      
      const foundUser = users.find(user => 
        user.name === name && user.password === password
      );

      if (foundUser) {
        console.log(foundUser)
        setOpenSuccess(true);
        setTimeout(() => {
          navigate('/dashboard', { state: { userId: foundUser.id } });

        }, 2000);
      } else {
        setOpenError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setOpenError(true);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);

  };

  return (
    <div className='login'>
      <Paper elevation={5} sx={{m:4}}>
      {/* <Card sx={{width: '50%', display: 'flex', flexDirection: 'row', ml:40,mt: 5}}> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 15,mb: 2 }}>
       
        <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '20px', paddingTop: '20px' }} /> {/* Logo Image */}
        <TextField
          label='Username'
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          open={openError}
          onClose={handleCloseError}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >

          <Alert severity='error'>Invalid username or password</Alert>
        </Snackbar>
        
        <Snackbar
          open={openSuccess}
          onClose={handleCloseSuccess}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >

          <Alert severity='success'>Login successful! Redirecting...</Alert>
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
