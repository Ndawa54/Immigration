import { Call, Email, Flag, LocationCity, Map, Edit } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch user details');

                const data = await response.json();
                setUserDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    return (
        <div>
            <Navigation />
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 4, 
                    p: 2 
                }}
            >
                <Card 
                    elevation={5} 
                    sx={{ 
                        width: 400, 
                        borderRadius: 4, 
                        textAlign: 'center', 
                        p: 3, 
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <>
                            {/* Profile Picture & Edit Button */}
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Avatar 
                                    src={userDetails?.profilePicture || 'https://via.placeholder.com/150'} 
                                    sx={{ width: 100, height: 100, mb: 1, border: '3px solid #1976d2' }} 
                                />
                                <Typography variant="h6" fontWeight="bold">
                                    {userDetails?.name || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {userDetails?.role || 'User'}
                                </Typography>
                                
                               
                            </Stack>

                            {/* Profile Info */}
                            <CardContent sx={{ mt: 2 }}>
                                <ProfileItem icon={<Email />} text={userDetails?.email} />
                                <Divider/>
                                <ProfileItem icon={<LocationCity />} text={userDetails?.address} />
                                <Divider/>
                                <ProfileItem icon={<Call />} text={userDetails?.phone} />
                                <Divider/>
                                <ProfileItem icon={<Flag />} text={userDetails?.country} />
                                <Divider/>
                                <ProfileItem icon={<Map />} text={userDetails?.district} />
                            </CardContent>
                        </>
                    )}
                </Card>
            </Box>
        </div>
    );
}

function ProfileItem({ icon, text }) {
    return (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            {icon}
            <Typography variant="body2" color="textSecondary">
                {text || 'N/A'}
            </Typography>
        </Stack>
    );
}
