import { CircularProgress, Stack, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Grid2, Icon, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DashboardNav from './DashboardNav';
import { Call, CheckCircleOutline, Email, Flag, HighlightOff, LocationCity, Map, PendingActions } from '@mui/icons-material';
import { useMemo } from 'react'; // Import useMemo for optimization

export default function Approver() {
    const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rowsToShow, setRowsToShow] = useState(5); // New state for rows to show

    const pendingCount = useMemo(() => users.filter(user => user.status === 'pending').length, [users]);
    const approvedCount = useMemo(() => users.filter(user => user.status === 'approve').length, [users]);
    const rejectedCount = useMemo(() => users.filter(user => user.status === 'reject').length, [users]);

    const handleClick = (user) => {
        setSelectedUser(user); // Set the selected user
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await axios.get('http://127.0.0.1:8000/api/users');
                const detailsResponse = await axios.get('http://127.0.0.1:8000/api/details');

                console.log("Users Data:", usersResponse.data);
                console.log("Details Data:", detailsResponse.data);

                // Combine user data with details
                const combinedData = usersResponse.data.map(user => {
                    const userDetails = detailsResponse.data.find(detail => detail.user_id === user.id) || {};
                    console.log(`User ${user.id} Details:`, userDetails);
                    return { ...user, ...userDetails }; // Merge user and details
                });

                console.log("Combined Data:", combinedData);
                setUsers(combinedData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Stack spacing={2} direction="column" alignItems="center" marginTop={34}> <CircularProgress size="3rem" /> </Stack>;
    if (error) return <Typography>Error fetching users: {error.message}</Typography>;

    return (
        <div>
            <DashboardNav />

            <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                <Grid2 item xs={12} sm={6} md={4}>
                    <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#f9a825', color: 'white' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon color='inherit' fontSize='large'>
                                <PendingActions fontSize='large' />
                            </Icon>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>
                                {pendingCount} {/* Show pending count */}
                            </Typography>
                            <Typography variant="h5" component="div" fontSize='medium'>Pending</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 item xs={12} sm={6} md={4}>
                    <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#8bc34a', color: 'white' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon color='inherit' fontSize='large'>
                                <CheckCircleOutline fontSize='large' />
                            </Icon>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>
                                {approvedCount} {/* Show approved count */}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ fontSize: 'medium' }}>Approved</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 item xs={12} sm={6} md={4}>
                    <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#d15353', color: 'white' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon color='inherit' fontSize='large'>
                                <HighlightOff fontSize='large' />
                            </Icon>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>
                                {rejectedCount} {/* Show rejected count */}
                            </Typography>
                            <Typography variant="h5" component="div" fontSize='medium'>Rejected</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>


            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} sx={{ maxWidth: '95%' }}>
                    <Table
                        sx={{
                            '& .MuiTableCell-root': {
                                padding: '10px 16px'
                            },
                            '& .MuiTableRow-root:hover': {
                                backgroundColor: '#f5f5f5'
                            },
                            '& .MuiTableRow-root:nth-of-type(odd)': {
                                backgroundColor: '#fafafa'
                            }
                        }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>ID</TableCell>
                                <TableCell align='right'>Name</TableCell>
                                <TableCell align='right'>View</TableCell>
                                <TableCell align='right'>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .filter(user => user.status === 'pending') // Only show "pending" users
                                .slice(0, rowsToShow) // Limit rows displayed
                                .map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell align='right'>{user.id}</TableCell>
                                        <TableCell align='right'>{user.name}</TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                color='primary'
                                                variant='contained'
                                                onClick={() => handleClick(user)}
                                                sx={{ margin: 2 }}>
                                                View
                                            </Button>
                                        </TableCell>
                                        <TableCell align='right'>{user.status}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>

            <Paper elevation={3} sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <TextField
                    select
                    label="Rows to Show"
                    value={rowsToShow}
                    onChange={(e) => setRowsToShow(e.target.value)}
                    sx={{ marginBottom: 2, width: '50ch' }}
                    fullWidth
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                </TextField>
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <h4 style={{ fontSize: 18 }}>User Details</h4>
                    {selectedUser && ( // Check if selectedUser is not null
                        <List>
                            <ListItem>
                                <ListItemIcon><Email /></ListItemIcon>
                                <ListItemText>{selectedUser.email}</ListItemText> {/* Display email */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><LocationCity /></ListItemIcon>
                                <ListItemText primary={selectedUser.address} /> {/* Display address */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Call /></ListItemIcon>
                                <ListItemText>{selectedUser.phone}</ListItemText> {/* Display phone */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Flag /></ListItemIcon>
                                <ListItemText>{selectedUser.country}</ListItemText> {/* Display nationality */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Map /></ListItemIcon>
                                <ListItemText>{selectedUser.district}</ListItemText> {/* Display location */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Typography>Destination:</Typography></ListItemIcon>
                                <ListItemText>{selectedUser.destination}</ListItemText> {/* Display location */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Typography>Reason : </Typography></ListItemIcon>
                                <ListItemText> {selectedUser.reason}</ListItemText> {/* Display reason */}
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Typography>Description:</Typography></ListItemIcon>
                                <ListItemText>{selectedUser.description}</ListItemText> {/* Display description */}
                            </ListItem>
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={async () => {
                            try {
                                await axios.put(`http://127.0.0.1:8000/api/details/${selectedUser.id}`,
                                    {
                                        user_id: selectedUser.user_id,
                                        destination: selectedUser.destination,
                                        reason: selectedUser.reason,
                                        description: selectedUser.description,
                                        status: 'approve'
                                    },
                                    { headers: { 'Content-Type': 'application/json' } }
                                );

                                setUsers(users.map(user =>
                                    user.id === selectedUser.id ? { ...user, status: 'approve' } : user
                                ));
                                handleClose();
                            } catch (error) {
                                console.error("Error updating status:", error);
                                alert("Failed to update status. Please check the server.");
                            }
                        }}
                    >
                        Approve
                    </Button>

                    <Button
                        variant='contained'
                        color='warning'
                        onClick={async () => {
                            try {
                                await axios.put(`http://127.0.0.1:8000/api/details/${selectedUser.id}`,
                                    {
                                        user_id: selectedUser.user_id,
                                        destination: selectedUser.destination,
                                        reason: selectedUser.reason,
                                        description: selectedUser.description,
                                        status: 'reject'
                                    },
                                    { headers: { 'Content-Type': 'application/json' } }
                                );

                                setUsers(users.map(user =>
                                    user.id === selectedUser.id ? { ...user, status: 'reject' } : user
                                ));
                                handleClose();
                            } catch (error) {
                                console.error("Error updating status:", error);
                                alert("Failed to update status. Please check the server.");
                            }
                        }}
                    >
                        Reject
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}
