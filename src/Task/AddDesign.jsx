import { Box, Button , Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import TaskAddDesign from './TaskAddDesign';



export default function AddDesign() {

return (
<Box sx={{
width:'100%',
height:'100%',
display:'flex',
justifyContent:'space-between'
}}>
<Box>
<Typography variant='h4' >
Task Management
</Typography>
<Typography variant='body2' color='text.secondary' >
Manage All Task Here.
</Typography>
</Box>
<Box>
<TaskAddDesign/>
</Box>
</Box>
)
}
