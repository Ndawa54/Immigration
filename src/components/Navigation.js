import { Logout, Menu, Person } from '@mui/icons-material'
import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Navigation() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        setOpen(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        navigate('/');
      };
    return (
        <div>

            <AppBar position='static'>
                <Toolbar sx={{backgroundColor:'#40b8ea', padding:1,}} >
                    <IconButton color='inherit' onClick={handleClick}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{
                        flexGrow: 1
                    }}> </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button color='inherit' component={Link} to='/home'>Home</Button>
                        <Button color='inherit' component={Link} to='/track'>Track</Button>
                        <Button color='inherit'>Contacts</Button>
                    </Stack>

                </Toolbar>
                <Drawer anchor="left" open={open} onClose={() => { setOpen(false) }} >
                    <Typography variant="h6" component="div" sx={{ fontSize: 15, mt: 2, ml: 2 }} > Menu </Typography>
                    <List sx={{ spacing: '2', width: '30ch', display: 'block', role: 'presentation' }}>
                        <ListItem>
                            <ListItemButton component={Link} to='/profile' state={{ user: { name: "Emmanuel", email: "johndoe53@gmail.com", phone: "+265 993 635 965", address: "Blantyre, Chileka", nationality: "Malawian" } }}>
                                <ListItemIcon color='inherit'><Person /></ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon color='inherit'><Logout /></ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </AppBar>
        </div>
    )
}
