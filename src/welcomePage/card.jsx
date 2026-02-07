import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


export default function Card( props) {
  const Icon=props.Icon;
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: {md:260,xs:170,sm:240},
          height: 150,
        },
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', height: '100%', px: 2, py: 3 }}>
        <Grid container direction='row' spacing={1} sx={{
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Grid size={4}>
           
              <Icon sx={{fontSize:'50px',color: props.iconColor}}/>
              
            
          </Grid>
          
          <Grid size={8}>
            <Box>
              <Grid container spacing={1}>
                <Grid size={12}>
                 <Typography variant='body2'>
                 {props.title}
                 </Typography>
                </Grid>
                <Grid size={12}>
                <Typography variant='h4' fontWeight={'bold'}>
                {props.no}
                 </Typography>
                </Grid>
               
              </Grid>
            </Box>
          </Grid>
           <Grid size={12}>
                   <Typography variant='body2' width={"100%"}>
                    {props.total}
                 </Typography>
                </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
