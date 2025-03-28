import { Box, TextField, Button, Snackbar, Alert, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import logo from '../images/logo192.jpg'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      const users = response.data;
      
      const foundUser = users.find(user => 
        user.name === name && user.password === password
      );

      if (foundUser) {
        setOpenSuccess(true);

        localStorage.setItem('userId', foundUser.id);
        localStorage.setItem('role', foundUser.role);

        setTimeout(() => { 
          if (foundUser.role.toLowerCase() === 'applicant') {
            navigate('/home', { state: { userId: foundUser.role } });
          } else if (['verifier', 'interviewer', 'approver'].includes(foundUser.role.toLowerCase())) {
            navigate('/dashboard', { state: { userId: foundUser.role } });
          } else {
            setOpenError(true);
          }
        }, 2000);
      } else {
        setOpenError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setOpenError(true);
    }
  };

  const handleCloseError = () => setOpenError(false);
  const handleCloseSuccess = () => setOpenSuccess(false);

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4'
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 360, textAlign: 'center', borderRadius: 3 }}>
        <img src={logo} alt="Logo" style={{ width: 80, marginBottom: 16 }} />
        
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome Back
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            py: 1.2, 
            backgroundColor: '#1976d2', 
            '&:hover': { backgroundColor: '#1565c0' } 
          }}
          onClick={handleClick}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Register here
          </Link>
        </Typography>

        {/* Error Snackbar */}
        <Snackbar open={openError} onClose={handleCloseError} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error">Invalid username or password</Alert>
        </Snackbar>

        {/* Success Snackbar */}
        <Snackbar open={openSuccess} onClose={handleCloseSuccess} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success">Login successful! Redirecting...</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
