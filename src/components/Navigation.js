import { Logout, Menu, Person } from '@mui/icons-material'
import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'


export default function Navigation() {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <IconButton color='inherit' onClick={handleClick}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{
                        flexGrow: 1
                    }}> </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button color='inherit'>Home</Button>
                        <Button color='inherit'>Track</Button>
                        <Button color='inherit'>Contacts</Button>
                    </Stack>

                </Toolbar>
                <Drawer anchor="left" open={open} onClose={() => { setOpen(false) }} >

                    <List sx={{ spacing: '2', width: '30ch', display: 'block', role: 'presentation' }}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon color='inherit'><Person /></ListItemIcon>
                                <ListItemText>Profile</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton>
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
