import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Box, Tab, Tabs, TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, Card } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const [interviewApproval, setInterviewApproval] = useState('pending');
  const [country, setCountry] = useState('');
  const [reason, setReason] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = Number(localStorage.getItem('userId'));
  const role = localStorage.getItem('role');

  console.log("User ID:", userId);
  console.log("Role:", role);

  // Function to fetch details and update interviewApproval
  const fetchDetails = async () => {
    try {
      // Fetch all details
      const response = await axios.get(`http://127.0.0.1:8000/api/details`);

      if (response.data.length > 0) {
        // Find the row where user_id matches userId
        const userDetails = response.data.find(detail => detail.user_id === userId);

        if (userDetails) {
          // Fetch specific details using its ID
          const detailsResponse = await axios.get(`http://127.0.0.1:8000/api/details/${userDetails.id}`);

          if (detailsResponse.data) {
            setInterviewApproval(detailsResponse.data.status);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };


  // Fetch data when component mounts
  useEffect(() => {
    fetchDetails();
  },);

  const handleClick = async () => {
    setError(null);
    setLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/details', {
        user_id: userId,
        destination: country,
        reason: reason,
        description: description,
        status: 'pending'
      });

      console.log('Details sent successfully');
      setCountry('');
      setReason('');
      setDescription('');

      // Fetch updated details after submitting
      fetchDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation />
      <Box>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Application Consent" />
          <Tab label="Interviews" disabled={interviewApproval !== 'approve'} />
          <Tab label="Payment" disabled={interviewApproval !== 'approved'} />
        </Tabs>
      </Box>
      <div>
        {activeTab === 0 && (
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 4, width: '90%' }}>
              <TextField
                label="Select Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                sx={{ mt: 5, mb: 2, width: '30ch' }}
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
                sx={{ mb: 2, width: '30ch' }}
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
                sx={{ mb: 2, width: '30ch' }}
                multiline
                rows={4}
              />
              <Button
                onClick={handleClick}
                variant='outlined'
                sx={{ mb: 2 }}
              >
                Submit
              </Button>
            </Card>
          </Box>
        )}
        {activeTab === 1 && interviewApproval === 'approve' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mt: 4 }}>
            <TextField label="Interview Date" sx={{ mb: 2, width: '35ch' }} />
            <TextField label="Interviewer Name" sx={{ mb: 2, width: '35ch' }} />
            <TextField label="Notes" sx={{ mb: 2, width: '35ch' }} />
            <Button type="submit" variant='outlined'>Submit Interview</Button>
          </Box>
        )}
        {activeTab === 2 && interviewApproval === 'approved' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mt: 4 }}>
            <TextField label="Name" sx={{ mb: 2, width: '35ch' }} />
            <TextField
              label="Payment Method"
              sx={{ mb: 2, width: '35ch' }}
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value='VS'>VISA</MenuItem>
              <MenuItem value='PC'>PayChangu</MenuItem>
              <MenuItem value='PP'>PayPal</MenuItem>
            </TextField>
            <FormControl>
              <InputLabel>Amount</InputLabel>
              <OutlinedInput
                label='Amount'
                startAdornment={<InputAdornment position='start'>MWK</InputAdornment>}
                sx={{ mb: 2, width: '35ch' }}
              />
            </FormControl>
            <TextField label="Description" sx={{ mb: 2, width: '35ch' }} />
            <Button type="submit" variant='outlined'>Pay</Button>
          </Box>
        )}
      </div>
    </div>
  );
}
