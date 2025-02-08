import { Menu } from '@mui/icons-material'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'


export default function Navigation() {
  return (
    <div>
        <AppBar>
            <Toolbar>
                <IconButton color='inherit'>
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1
                }}> Home</Typography>

                <Stack direction="row" spacing={2}>
                    <Button color='inherit'>News</Button>
                    <Button color='inherit'>Weather</Button>
                    <Button color='inherit'>Settings</Button>
                </Stack>

            </Toolbar>
        </AppBar>
    </div>
  )
}
