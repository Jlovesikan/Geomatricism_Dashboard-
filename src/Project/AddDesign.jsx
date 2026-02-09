import { Box, Button , Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import ProjectAddDesign from './ProjectAddDesign';


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
           Projects Management
        </Typography>
        <Typography variant='body2' color='text.secondary' >
           Manage All Project Here.
        </Typography>
    </Box>
    <Box>
       <ProjectAddDesign/>
    </Box>
  </Box>
  )
}
