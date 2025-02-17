import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, List, ListItem, ListItemIcon, ListItemText, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DashboardNav from './DashboardNav'
import { Call, Email, Flag, LocationCity, Map } from '@mui/icons-material'

export default function Approver() {

    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    console.log(value)

    return (
        <div>
            <DashboardNav />

            <Grid2 container spacing={2} >
                <Grid2 size={{ xs: 7, sm: 4, md: 3 }} sx={{ ml: 9 }}>
                    <Card sx={{ m: 3, width: 200, height: 120, backgroundColor: '#f9a825', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">Pending</Typography>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>16</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 size={{ xs: 7, sm: 4, md: 3 }} sx={{ ml: 9 }}>
                    <Card sx={{ m: 3, width: 200, height: 120, backgroundColor: '#8bc34a', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">Approved</Typography>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>9</Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 size={{ xs: 7, sm: 4, md: 3 }} sx={{ ml: 9 }}>
                    <Card sx={{ m: 3, width: 200, height: 120, backgroundColor: '#d15353', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">Rejected</Typography>
                            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'text.secondary' }}>5</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
            <>
            <Box>
                <Button 
                color='primary' 
                variant='contained' 
                onClick={handleClick} 
                sx={{margin: 2}}>Open dialog</Button>
            </Box>
                
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogContent>
                        <h4 style={{ fontSize: 18 }}>User Details</h4>
                        <TextField
                            label="User"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            select
                            fullWidth
                        >
                            <MenuItem value='EN'>Emmanuel Ndawa</MenuItem>
                            <MenuItem value='TM'>Thokozani Mpingasa</MenuItem>
                            <MenuItem value='CC'>Chikondi Chiomba</MenuItem>
                        </TextField>
                        
                        <List>
                            <ListItem>
                                <ListItemIcon><Email /></ListItemIcon>
                                <ListItemText >johndoe53@gmail.combbbbbbbbbbbbbb</ListItemText>
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
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='success' onClick={handleClose}>Approve</Button>
                        <Button variant='contained' color='warning' onClick={handleClose}>Reject</Button>
                    </DialogActions>
                </Dialog>
            </>

        </div>
    )
}
