import { Call, Email, Flag, LocationCity, Map } from '@mui/icons-material'
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Stack } from '@mui/material'
import React from 'react'
import logo from '../images/user.png'
import Navigation from './Navigation'

export default function Profile() {
    return (
        <div>
            <Navigation />
            <Paper elevation={3} sx={{ padding: 2, margin: 6}}>
                <Stack spacing={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt:5 }}>
                        <img src={logo} alt="profile" style={{ width: '24ch' }} />
                        <h2>John Doe</h2>
                        <List>
                            <ListItem>
                                <ListItemIcon><Email /></ListItemIcon>
                                <ListItemText >johndoe53@gmail.com</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><LocationCity /></ListItemIcon>
                                <ListItemText primary="Address" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Call /></ListItemIcon>
                                <ListItemText >+265 993 635 965</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Flag /></ListItemIcon>
                                <ListItemText>Malawian</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><Map /></ListItemIcon>
                                <ListItemText>Blantyre, Chileka</ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                </Stack>
            </Paper>
        </div>
    )
}
