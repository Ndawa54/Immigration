import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Box, Tab, Tabs, TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, Card, Snackbar, Alert } from '@mui/material';
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
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [passportFile, setPassportFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);

  const userId = Number(localStorage.getItem('userId'));
  const role = localStorage.getItem('role');

  console.log("User ID:", userId);
  console.log("Role:", role);

  const handleClose = () => {
    setOpen(false)
  }

  const handlePassportChange = (e) => {
    setPassportFile(e.target.files[0]);
  };

  const handleDocumentChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };
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
    if (!country || !reason || !description) {
      setErrorMessage('Please fill in all required fields.');
      setErrorOpen(true);
      return;
    }

    setError(null);
    setLoading(true);
    setOpen(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/details', {
        user_id: userId,
        destination: country,
        reason: reason,
        description: description,
        status: 'pending',
        interview_date: '-',
        interview_status: '-'
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

              {/* Upload Passport Photo */}
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}
              >
                Upload Passport Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePassportChange}
                />
              </Button>
              {passportFile && <p>{passportFile.name}</p>}

              {/* Upload Supporting Document */}
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}
              >
                Upload Document
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={handleDocumentChange}
                />
              </Button>
              {documentFile && <p>{documentFile.name}</p>}
              <Button
                onClick={handleClick}
                variant='outlined'
                sx={{ mb: 2 }}
              >
                Submit
              </Button>
            </Card>

            {/* Success Snackbar */}
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity='success'>Details have been uploaded successfully!....</Alert>
            </Snackbar>

            {/* Error SnackBar */}
            <Snackbar
              open={errorOpen}
              autoHideDuration={6000}
              onClose={() => setErrorOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity='warning'>{errorMessage}</Alert>
            </Snackbar>
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
