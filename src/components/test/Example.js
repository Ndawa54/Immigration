// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
// import React, { useState } from 'react'

// export default function Example() {
//     const [value, setValue] = useState('')
//     const [open, setOpen] = useState(false)

//     const handleClick = () => {
//         setOpen(true)
//     }

//     const handleClose = () => {
//         setOpen(false)
//     }
//     console.log(value)

//     return (
//         <div>

//             <Button color='inherit' onClick={handleClick}>Open dialog</Button>
//             <Dialog 
//             open={open}
//             onClose={() => setOpen(false)}
//             >
//                 <DialogTitle>
//                     <h2>Users Details</h2>
//                 </DialogTitle>
//                 <DialogContent>
//                     <p>Users Details</p>
//                     <TextField
//                         label="User"
//                         value={value}
//                         onChange={(e) => setValue(e.target.value)}
//                         select
//                         fullWidth
//                     >
//                         <MenuItem value='EN'>Emmanuel Ndawa</MenuItem>
//                         <MenuItem value='TM'>Thokozani Mpingasa</MenuItem>
//                         <MenuItem value='CC'>Chikondi Chiomba</MenuItem>
//                     </TextField>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button variant='contained' color='success' onClick={handleClose}>Approve</Button>
//                     <Button variant='contained' color='warning' onClick={handleClose}>Reject</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     )
// }
