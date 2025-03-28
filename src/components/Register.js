import { 
    Alert, Box, Button, FormControl, InputAdornment, InputLabel, 
    OutlinedInput, Paper, Snackbar, TextField, Typography 
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '', address: '', dob: '', phone: '', email: '',
        country: '', district: '', height: '', ta: '', password: '', confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const navigate = useNavigate();

    const handleCloseSuccess = () => setOpenSuccess(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All required fields must be filled.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axios.post('http://127.0.0.1:8000/api/users', {
                ...formData, role: 'Applicant'
            });

            setOpenSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Paper elevation={6} sx={{ p: 4, maxWidth: 500, width: '90%' }}>
                <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                    Create Your Account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput
                        name="phone" type="number" value={formData.phone} onChange={handleChange}
                        startAdornment={<InputAdornment position="start">+265</InputAdornment>}
                        label="Phone Number"
                    />
                </FormControl>

                <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />

                <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth sx={{ mb: 2 }} multiline rows={2} />

                <TextField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                <TextField label="Country of Birth" name="country" value={formData.country} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField label="Village" name="village" value={formData.village} onChange={handleChange} sx={{ flex: 1 }} />
                    <TextField label="District" name="district" value={formData.district} onChange={handleChange} sx={{ flex: 1 }} />
                </Box>

                <TextField label="T/A" name="ta" value={formData.ta} onChange={handleChange} fullWidth sx={{ my: 2 }} />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Height</InputLabel>
                    <OutlinedInput name="height" type="number" value={formData.height} onChange={handleChange} startAdornment={<InputAdornment position="start">CM</InputAdornment>} label="Height" />
                </FormControl>

                <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />

                <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />

                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading} sx={{ mb: 2 }}>
                    {loading ? 'Registering...' : 'Register'}
                </Button>

                <Snackbar open={openSuccess} onClose={handleCloseSuccess} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert severity="success">Registered successfully! Redirecting...</Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
}
