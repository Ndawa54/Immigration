import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Icon, List, ListItem, ListItemIcon, ListItemText, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DashboardNav from './DashboardNav'
import { Call, CheckCircleOutline, Email, Flag, HighlightOff, LocationCity, Map, Pending, PendingActions } from '@mui/icons-material'

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
                    <Table sx={{
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
                            <TableRow>
                                <TableCell align='right'>1</TableCell>
                                <TableCell align='right'>John Doe</TableCell>
                                <TableCell align='right'>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        onClick={handleClick}
                                        sx={{ margin: 2 }}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='right'>2</TableCell>
                                <TableCell align='right'>Emmanuel Ndawa</TableCell>
                                <TableCell align='right'>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        onClick={handleClick}
                                        sx={{ margin: 2 }}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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
        </div>
    )
}
