import { Box, Button , Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import EmpAddDesign from './EmpAddDesign';

export default function EmpDesign() {
  return (
  <Box sx={{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'space-between'
  }}>
    <Box>
        <Typography variant='h4' >
            Employees Management
        </Typography>
        <Typography variant='body2' color='text.secondary' >
           Manage All Empolyees Here.
        </Typography>
    </Box>
    <Box>
        <EmpAddDesign/>
    </Box>
  </Box>
  )
}
