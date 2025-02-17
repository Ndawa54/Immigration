import {  AnalyticsOutlined, Approval, Dashboard, Logout, Menu, Person, Person2, Verified } from '@mui/icons-material';
import { AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DashboardNav() {
    const [open, setOpen] = useState(false);
    
    const userRole = 'interviewer'
    const handleClick = () => {
        setOpen(true);
    };

    return (
        <div>
            <AppBar position='static' >
                <Toolbar sx={{ backgroundColor: '#40b8ea', padding: 1 }}>
                    <IconButton color='inherit' onClick={handleClick}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}> </Typography>
                    {/* <Stack direction="row" spacing={2}>
                        <Button color='inherit'>Home</Button>
                        <Button color='inherit'>Track</Button>
                        <Button color='inherit'>Contacts</Button>
                    </Stack> */}
                </Toolbar>
                <Drawer variant="persistent" anchor="left" open={open} onClick={() => { setOpen(false) }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold',fontSize: 13, mt: 2, ml: 2 }}> Main Items </Typography>
                    <List sx={{ spacing: '2', width: '30ch', display: 'block', role: 'presentation' }}>
                        {userRole === 'interviewer' && (
                            <>
                                <ListItem>
                                    <ListItemButton component={Link} to='/dashboard'>
                                        <ListItemIcon color='inherit'><Dashboard /></ListItemIcon>
                                        <ListItemText>Dashboard</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton component={Link} to=''>
                                        <ListItemIcon color='inherit'><Person2 /></ListItemIcon>
                                        <ListItemText>Interview</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold',fontSize: 13, mt: 2, ml: 2 }}> Analytics </Typography>
                                <ListItem>
                                    <ListItemButton component={Link} to='/report'>
                                        <ListItemIcon color='inherit'><AnalyticsOutlined /></ListItemIcon>
                                        <ListItemText>Analytics</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                        {userRole === 'approver' && (
                            <>
                             <ListItem>
                                    <ListItemButton component={Link} to='/dashboard'>
                                        <ListItemIcon color='inherit'><Dashboard /></ListItemIcon>
                                        <ListItemText>Dashboard</ListItemText>
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton component={Link} to='/approve'>
                                        <ListItemIcon color='inherit'><Approval /></ListItemIcon>
                                        <ListItemText>Approve/Reject</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                        {userRole === 'verifier' && (
                            <>
                                <ListItem>
                                    <ListItemButton component={Link} to='/dashboard'>
                                        <ListItemIcon color='inherit'><Dashboard /></ListItemIcon>
                                        <ListItemText>Dashboard</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton component={Link} to=''>
                                        <ListItemIcon color='inherit'><Verified /></ListItemIcon>
                                        <ListItemText>Verification List</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                        <Divider />
                        <ListItem>
                            <ListItemButton component={Link} to='/'>
                                <ListItemIcon color='inherit'><Logout /></ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>
        </div>
    );
}
