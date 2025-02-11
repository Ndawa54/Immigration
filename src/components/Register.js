import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    const [fullname, setFullname] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  

    const handleClick = () => {
        console.log('Fullname:', fullname)
        console.log('Address:', address)
        console.log('Date:', date)
        console.log('Number:', number)
        console.log('Email:', email)
        console.log('Password:', password)
    
    }
    return (
        <div>
             <Paper elevation={5} sx={{m:4}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', m: 2 }}>
                <h2>Register</h2>
                <TextField
                    label='Name in Full'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    sx={{ mb: 2, width: '50ch' }}
                    required />

                <FormControl sx={{ mb: 2, width: '50ch' }}>
                    <InputLabel>Number</InputLabel>
                    <OutlinedInput
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type='date'
                    sx={{ mb: 2, width: '50ch' }} />

                <TextField
                    label='Place and Country of birth'
                    sx={{ mb: 2, width: '50ch' }} />

                <Box sx={{ mr: -0.5, display: 'flex', flexDirection: 'row' }}>
                    <TextField label='Village' sx={{ m: 1, width: '23ch' }} />
                    <TextField label='District' sx={{ m: 1, ml: 2, width: '24ch' }} />
                </Box>

                <TextField label='T/A' sx={{ mb: 2, width: '50ch' }} />
                <FormControl variant='outlined' sx={{ mb: 2, width: '50ch' }}>
                    <InputLabel>Height</InputLabel>
                    <OutlinedInput
                        label='Height'
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
                    
                <Button color='primary' variant='contained' onClick={handleClick} sx={{mb:4}}>Register</Button>
               
            </Box>
            </Paper>
        </div>
    )
}
