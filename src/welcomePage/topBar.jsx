import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

export default function TopBar() {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'space-between', // Dashboard-ஐ இடதுபுறமும், Search-ஐ வலதுபுறமும் தள்ளும்
        alignItems: 'center',
        paddingY: 1
      }}
    >
      <Typography variant='h4' sx={{ fontWeight: '500' }}>
        DashBoard
      </Typography>

      <TextField
        placeholder="Search..."
        size="small"
        sx={{ width: '300px' }} // Search Bar அகலம்
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}