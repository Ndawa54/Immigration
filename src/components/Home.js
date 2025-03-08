import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation'
import { Box, Tab, Tabs, TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, Card } from '@mui/material'

export default function Home() {
  const location = useLocation(); // Retrieve location state // Get user ID from state
  const [applicationConsent, setApplicationConsent] = useState('pending');

  const [interviewApproval, setInterviewApproval] = useState('pending');
  const [country, setCountry] = useState('');
  const [reason, setReason] = useState('');
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [value , setValue] = useState('')
  const [description, setDescription] = useState('')
   console.log(value,country,reason,description)
   const userId = Number(localStorage.getItem('userId'));
   const role = localStorage.getItem('role');
   
   console.log("User ID:", userId);
   console.log("Role:", role);

  return (
    <div>
      <Navigation  /> {/* Pass userId to Navigation if needed */}
    
      <Box>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Application Consent" />
          <Tab label="Interviews" disabled={applicationConsent === 'pending'} />
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
            onClick={() => setApplicationConsent('approved')} 
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
        {activeTab === 1 && applicationConsent === 'approved' && (
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
