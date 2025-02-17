import React, { useState } from 'react'
import Navigation from './Navigation'
import { Box, Tab, Tabs, TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'

export default function Home() {
  const [applicationConsent, setApplicationConsent] = useState('pending');
  const [interviewApproval, setInterviewApproval] = useState('pending');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [value , setValue] = useState('')
   console.log(value)


  return (
    <div>
      <Navigation/>
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
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mt: 4,}}>
            <TextField 
              label="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              sx={{mb: 2, width: '30ch'}}
            />
            <TextField 
              label="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              sx={{mb: 2,width: '30ch'}}
            />
            <Button onClick={() => setApplicationConsent('approved')} variant='outlined'>Submit</Button>
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
