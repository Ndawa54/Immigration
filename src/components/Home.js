import React, { useState } from 'react'
import Navigation from './Navigation'
import { Box, Tab, Tabs, TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, Card } from '@mui/material'
import axios from 'axios';

export default function Home() {
  const [applicationConsent, setApplicationConsent] = useState('pending');
  const [interviewApproval, setInterviewApproval] = useState('pending');
  const [country, setCountry] = useState('');
  const [reason, setReason] = useState('');
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [value , setValue] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false); // Added loading state

  console.log(value,country,reason)
  const userId = Number(localStorage.getItem('userId'));
  const role = localStorage.getItem('role');
   
   console.log("User ID:", userId);
   console.log("Role:", role);

   const handleClick = async () => { // Added async keyword
    setError(null)
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/details', {
        user_id : userId,
        destination : country, // Use the state value
        reason : reason, // Use the state value
        description : description, // Use the state value
        status : 'pending'
      })
      console.log('Details sent successfully:', response.data)

      setCountry('')
      setReason('')
      setDescription('')

    }

    catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      console.error('Registration error:', err)
    } finally {
      setLoading(false) // Set loading to false
    }
   }

  return (
    <div>
      <Navigation  /> {/* Pass userId to Navigation if needed */}
    
      <Box>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Application Consent" />
          <Tab label="Interviews" disabled={interviewApproval === 'pending'} />
          <Tab label="Payment" disabled={interviewApproval !== 'approved'} />
        </Tabs>
      </Box>
      <div>
        {/* Show the form only in the Application Consent tab */}
        {activeTab === 0 && (
          <div>
            <Box sx={{ p: 3, display: 'flex' , justifyContent: 'center' }}>
            <Card sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',m: 4,width: '90%', }}>
            <TextField 
              label="Select Country" 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
              sx={{mt:5,mb: 2, width: '30ch'}}
              select
              fullWidth
            >
              <MenuItem value='ZA'>Zambia</MenuItem>
              <MenuItem value='TZ'>Tanzania</MenuItem>
              <MenuItem value='ZM'>Zimbabwe</MenuItem>
              <MenuItem value='MZ'>Mozambique</MenuItem>
            </TextField>
            <TextField 
              label="Reason" 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              sx={{mb: 2,width: '30ch'}}
              select
              fullWidth
          >
              <MenuItem value='Meeting'>Attend a Meeting</MenuItem>
              <MenuItem value='Medical'>Seek Medical Help</MenuItem>
              <MenuItem value='School'>School Work</MenuItem>
            </TextField>
            <TextField
              label='Detailed Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{mb: 2,width: '30ch'}}
              multiline
              rows={4}
            />

            <Button 
              onClick={handleClick} 
              variant='outlined'
              sx={{mb: 2}}
            >
              Submit
            </Button>
            </Card>
            </Box>
          </div>
        )}
        {/* Show interview forms only in the Interviews tab */}
        {activeTab === 1 && interviewApproval === 'approved' && (
          <div>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mt: 4,}}>
              <TextField label="Interview Date" sx={{mb: 2, width: '35ch'}}/>
              <TextField label="Interviewer Name" sx={{mb: 2, width: '35ch'}}/>
              <TextField label="Notes" sx={{mb: 2, width: '35ch'}}/>
              <Button type="submit" variant='outlined'>Submit Interview</Button>
            </Box>
          </div>
        )}
        {/* Show payment content only in the Payment tab */}
        {activeTab === 2 && interviewApproval === 'approved' && 
        <div>
           <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mt: 4,}}>
              <TextField label="Name" sx={{mb: 2, width: '35ch'}}/>
              <TextField 
              label="Payment Method" 
              sx={{mb: 2, width: '35ch'}}
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              >
                <MenuItem value='VS'>VISA</MenuItem>
                <MenuItem value='PC'>PayChangu</MenuItem>
                <MenuItem value='PP'>PayPal</MenuItem>
              </TextField>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                <OutlinedInput
                label='Amount'
                startAdornment={<InputAdornment position='start'>MWK</InputAdornment>}
                sx={{mb: 2, width: '35ch'}}
                />
              </FormControl>
              <TextField label="Description" sx={{mb: 2, width: '35ch'}}/>
              <Button type="submit" variant='outlined'>Pay</Button>
              </Box>
        </div>}
      </div>
      <div>
        <button onClick={() => setInterviewApproval('approved')}>Enable Payments Approved</button>
      </div>
    </div>
  )
}
