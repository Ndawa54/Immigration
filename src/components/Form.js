import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React from 'react'

export default function Form() {
    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', width: '100%', mt: 4,mb: 2 }}>
                <TextField label='Name in Full' sx={{ mb: 2, width: '50ch' }} fullWidth />
                <TextField label='Address' multiline rows={2} sx={{ mb: 2, width: '50ch' }} />
                <TextField label='' type='date' sx={{ mb: 2, width: '50ch' }} />
                <TextField label='Place and Country of birth' sx={{ mb: 2, width: '50ch' }} />

                <Box sx={{ mr: -0.5, display: 'flex', flexDirection: 'row' }}>
                    <TextField label='Village' sx={{ m: 1, width: '23ch' }} />
                    <TextField label='District' sx={{ m: 1, ml: 2, width: '24ch' }} />
                </Box>

                <TextField label='T/A' sx={{ mb: 2, width: '50ch' }} />
                <FormControl variant='outlined' sx={{ mb: 2, width: '50ch' }}>
                    <InputLabel>Height</InputLabel>
                    <OutlinedInput
                        label='Height'
                        type='number'
                        startAdornment={<InputAdornment position='start'>CM</InputAdornment>}
                    />
                </FormControl>
                <TextField label='Distinguishing Marks' sx={{ mb: 2, width: '50ch' }} />
                <TextField label='Occupation/Profession' sx={{ mb: 2, width: '50ch' }} />

                <Button color='primary' variant='contained'>Submit</Button>
            </Box>
        </div>
    )
}
