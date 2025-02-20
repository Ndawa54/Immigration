import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [district, setDistrict] = useState('')
    const [height, setHeight] = useState('')
    const [ta, setTa] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleClick = async () => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users', {
                name,
                address,
                dob,
                phone,
                email,
                country,
                district,
                height,
                ta,
                role,
                password
            })
            console.log('Registration successful:', response.data)
            // Clear form fields
            setName('')
            setAddress('')
            setDob('')
            setPhone('')
            setEmail('')
            setCountry('')
            setDistrict('')
            setHeight('')
            setTa('')
            setRole('')
            setPassword('')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
            console.error('Registration error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Paper elevation={5} sx={{m:4}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 2 }}>
                    <h2>Register</h2>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <TextField
                        label='Name in Full'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2, width: '50ch' }}
                        required />

                    <FormControl sx={{ mb: 2, width: '50ch' }}>
                        <InputLabel>Number</InputLabel>
                        <OutlinedInput
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type='number'
                            startAdornment={<InputAdornment position='start'>+265</InputAdornment>}
                            label='Number'
                        />
                    </FormControl>

                    <TextField
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email' sx={{ mb: 2, width: '50ch' }} />

                    <TextField
                        label='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        multiline
                        rows={2}
                        sx={{ mb: 2, width: '50ch' }} />

                    <TextField
                        label=''
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        type='date'
                        sx={{ mb: 2, width: '50ch' }} />

                    <TextField
                        label='Place and Country of birth'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        sx={{ mb: 2, width: '50ch' }} />

                    <Box sx={{ mr: -0.5, display: 'flex', flexDirection: 'row' }}>
                        <TextField 
                        label='Village'
                        sx={{ m: 1, width: '23ch' }} />
                        <TextField 
                        label='District'
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        sx={{ m: 1, ml: 2, width: '24ch' }} />
                    </Box>

                    <TextField 
                    label='T/A'
                    value={ta}
                    onChange={(e) => setTa(e.target.value)}
                    sx={{ mb: 2, width: '50ch' }} />
                    <TextField 
                    label='Role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ mb: 2, width: '50ch' }} />
                    <FormControl variant='outlined' sx={{ mb: 2, width: '50ch' }}>
                        <InputLabel>Height</InputLabel>
                        <OutlinedInput
                            label='Height'
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            type='number'
                            startAdornment={<InputAdornment position='start'>CM</InputAdornment>}
                        />
                    </FormControl>
                    
                    <TextField
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        sx={{ mb: 2, width: '50ch' }} required />

                    <TextField
                        label='Confirm Password'
                        sx={{ mb: 2, width: '50ch' }} required />
                        
                    <Button 
                        color='primary' 
                        variant='contained' 
                        onClick={handleClick} 
                        disabled={loading}
                        sx={{mb:4}}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </Box>
            </Paper>
        </div>
    )
}
