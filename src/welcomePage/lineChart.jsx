import { Card,Box,CardContent, CardHeader, Paper,Typography, Grid, List, ListItemIcon, ListItemText } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';


export default function BasicArea() {
  return (
   
<Paper elevation={3}>
  <Card sx={{ height: "100%", width:'100%'}}>

    <Grid container
    direction="row"
    spacing={1}
    sx={{
    justifyContent: "flex-start",
    alignItems: "center",
    px:2,
    py:2,
    }}>

    <Grid item>

    <Typography textAlign={'center'} variant="h6" sx={{fontWeight:'bold'}}>Project progress</Typography>

    </Grid>

    <Grid item>

    <Typography variant="body2" color="text.secondary" sx={{mt:0.5}}>
    (Last Six Months)
    </Typography>

    </Grid>

    </Grid>



  
  <Box>
  <LineChart  margin={{ left: 0,}} sx={{

  }}
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  series={[
  {
  data: [1, 5.5, 2, 8.5, 1.5, 5],
  area: true,
  },
  {
  data: [3, 5.5, 2, 9.5, 1.5, 6],
  
  },
  ]}
  height={280}
  
  />
  </Box>
  <Box>
    <Grid container
    direction="row"
    spacing={2}
    sx={{
    justifyContent: "flex-start",
    alignItems: "center",
    px:{md:2,xs:0},
    py:2,
    }}>

    <Grid item>

    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <SquareRoundedIcon sx={{color:'navy'}}/>
      <Typography variant="body2" color="black" >
      Project
    </Typography>
      
    </Box>

    </Grid>

    <Grid item>

    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <SquareRoundedIcon sx={{color:'yellow'}}/>
      <Typography variant="body2" color="black" >
      Task
    </Typography>
    </Box>

    </Grid>

    </Grid>
  </Box>


</Card>
</Paper>
   
    
  );
}
