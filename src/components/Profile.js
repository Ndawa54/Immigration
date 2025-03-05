import { Call, Email, Flag, LocationCity, Map } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../images/user.png';
import Navigation from './Navigation';

export default function Profile() {
    const location = useLocation();
    const [userDetails, setUserDetails] = useState({});
    const userId = 1; // Hardcoded user ID for testing

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`); // Replace with actual API endpoint
                const data = await response.json();
                if (data.id === userId) {
                    setUserDetails(data);
                } else {
                    console.error('User ID does not match');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    return (
        <div>
            <Navigation />
            <Paper elevation={3} sx={{ padding: 2, margin: 6 }}>
                <Stack spacing={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
                        <img src={logo} alt="profile" style={{ width: '24ch' }} />
                        <h2>{userDetails.name || 'Loading...'}</h2>
                        <List>
                            <ListItem>
                                <ListItemIcon><Email /></ListItemIcon>
                                <ListItemText>{userDetails.email || 'Loading...'}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><LocationCity /></ListItemIcon>
                                <ListItemText primary={userDetails.address || 'Loading...'} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Call /></ListItemIcon>
                                <ListItemText>{userDetails.phone || 'Loading...'}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Flag /></ListItemIcon>
                                <ListItemText>{userDetails.country || 'Loading...'}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Map /></ListItemIcon>
                                <ListItemText>{userDetails.district || 'Loading...'}</ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </Paper>
        </div>
    );
}
