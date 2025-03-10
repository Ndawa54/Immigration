import {CircularProgress,Stack, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Icon, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import DashboardNav from './DashboardNav'
import { Call, CheckCircleOutline, Email, Flag, HighlightOff, LocationCity, Map, Pending, PendingActions } from '@mui/icons-material'
import axios from 'axios';

export default function Approver() {

    const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rowsToShow, setRowsToShow] = useState(5); // New state for rows to show

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
                const response = await axios.get('http://127.0.0.1:8000/api/users'); // Replace with actual API endpoint
                setUsers(response.data);
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
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>16</Typography>
                            <Typography variant="h5" component="div" fontSize='medium'>Pending</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 item xs={12} sm={6} md={4}>
                    <Card sx={{ m: 2, width: 150, height: 180, backgroundColor: '#8bc34a', color: 'white' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon color='inherit' fontSize='large' >
                                <CheckCircleOutline fontSize='large' />
                            </Icon>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>9</Typography>
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
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>5</Typography>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(0, rowsToShow).map(user => ( // Limit rows displayed
                                <TableRow key={user.id}>
                                    <TableCell align='right'>{user.id}</TableCell>
                                    <TableCell align='right'>{user.name}</TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            onClick={() => handleClick(user)} // Pass user to handleClick
                                            sx={{ margin: 2 }}>
                                            View
                                        </Button>
                                    </TableCell>
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
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='success' onClick={handleClose}>Approve</Button>
                    <Button variant='contained' color='warning' onClick={handleClose}>Reject</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
