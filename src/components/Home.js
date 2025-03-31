import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import {
  Box, Typography, Tab, Tabs, TextField, Button, MenuItem, FormControl, InputLabel, OutlinedInput, InputAdornment, Card, Snackbar, Alert, CircularProgress, useMediaQuery, useTheme,
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';


export default function Home() {
  const [interviewApproval, setInterviewApproval] = useState('pending');
  const [country, setCountry] = useState('');
  const [reason, setReason] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [passportFile, setPassportFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);

  const userId = Number(localStorage.getItem('userId'));

  const handleClose = () => {
    setOpen(false);
    setErrorOpen(false)}

  const handlePassportChange = (e) => {
    setPassportFile(e.target.files?.[0] || null);
  };

  const handleDocumentChange = (e) => {
    setDocumentFile(e.target.files?.[0] || null);
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/details`);
      if (response.data.length > 0) {
        const userDetails = response.data.find((detail) => detail.user_id === userId);
        if (userDetails) {
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

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleClick = async () => {
    if (!country || !reason || !description) {
      setErrorMessage('Please fill in all required fields.');
      setErrorOpen(true);
      return;
    }

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
        interview_status: '-',
      });

      setCountry('');
      setReason('');
      setDescription('');
      fetchDetails();
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Navigation />
      <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Application" />
          <Tab label="Interviews" disabled={!['approve', 'scheduled', 'approved'].includes(interviewApproval)} />
          <Tab label="Payment" disabled={interviewApproval !== 'approved'} />
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Card sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 2, boxShadow: 3, borderRadius: 2 }}>
            <TextField
              label="Select Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              select
              sx={{ mb: 2 }}
            >
              <MenuItem value="ZA">Zambia</MenuItem>
              <MenuItem value="TZ">Tanzania</MenuItem>
              <MenuItem value="ZM">Zimbabwe</MenuItem>
              <MenuItem value="MZ">Mozambique</MenuItem>
            </TextField>

            <TextField
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              select
              sx={{ mb: 2 }}
            >
              <MenuItem value="Meeting">Attend a Meeting</MenuItem>
              <MenuItem value="Medical">Seek Medical Help</MenuItem>
              <MenuItem value="School">School Work</MenuItem>
            </TextField>

            <TextField
              label="Detailed Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Passport Photo
              <input type="file" hidden accept="image/*" onChange={handlePassportChange} />
            </Button>
            {passportFile && <p>{passportFile.name}</p>}

            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Upload Document
              <input type="file" hidden accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleDocumentChange} />
            </Button>
            {documentFile && <p>{documentFile.name}</p>}

            <Button
              onClick={handleClick}
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ py: 1, mt: 1, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Submit'}
            </Button>
            
          <Snackbar
          open={errorOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="warning" sx={{ width: '100%' }}>{errorMessage}</Alert>
          </Snackbar>

          <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }}> Details Submitted Successfully...</Alert>
          </Snackbar>

          </Card>

        )}

        {activeTab === 1 && (
          <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, textAlign: 'center' }}>

            {/* If interview is pending approval */}
            {interviewApproval === 'approve' && (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Your interview schedule is pending, please wait for a schedule.
                </Typography>

                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <CircularProgress color="primary" />
                </motion.div>

                <Button variant="contained" fullWidth sx={{ mt: 3 }}>
                  Re-schedule
                </Button>
              </>
            )}

            {/* If interview is scheduled */}
            {interviewApproval === 'scheduled' && (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Your interview has been scheduled.
                </Typography>
                <Typography variant="body1">
                  Date: <strong>March 30, 2025</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Interviewer: <strong>John Doe</strong>
                </Typography>
                <Button variant="contained" color="success" fullWidth>
                  Confirm Attendance
                </Button>
              </>
            )}

            {interviewApproval === 'approved' && (
              <>
                <Typography variant="h6" color="green" sx={{ mb: 2 }}>
                  ✅ Interview Completed & Approved!
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Proceed to Next Step
                </Button>
              </>
            )}

          </Box>
        )}

        {activeTab === 2 && interviewApproval === 'approved' && (
          <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}>
            <TextField label="Name" fullWidth sx={{ mb: 2 }} />
            <TextField label="Payment Method" fullWidth select sx={{ mb: 2 }} value={value} onChange={(e) => setValue(e.target.value)}>
              <MenuItem value="VS">VISA</MenuItem>
              <MenuItem value="PC">PayChangu</MenuItem>
              <MenuItem value="PP">PayPal</MenuItem>
            </TextField>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Amount</InputLabel>
              <OutlinedInput startAdornment={<InputAdornment position="start">MWK</InputAdornment>} />
            </FormControl>
            <Button variant="contained" fullWidth>Pay</Button>
          </Box>
        )}
      </Box>
    </div>
  );
}
