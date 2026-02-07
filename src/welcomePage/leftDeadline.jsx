import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  ListItemIcon,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

const deadlines = [
  {
    task: "Foundation Work",
    date: "Today",
    priority: "High",
    color: "error",
  },
  {
    task: "Electrical Installation",
    date: "20 Apr",
    priority: "Medium",
    color: "warning",
  },
  {
    task: "Safety Inspection",
    date: "22 Apr",
    priority: "Low",
    color: "success",
  },
];


export default function Deadlines() {
  return (

     <Paper elevation={3}>
       <Card   sx={{ height: "100%", width:'100%'}}>
      <CardHeader title="Upcoming Deadlines" />
      
      <CardContent  >
        <List disablePadding>
          {deadlines.map((item, index) => (
            <Box key={index}>
              <ListItem sx={{
              }}
                secondaryAction={
                  <Chip sx={{width:100}}
                    label={item.priority}
                    color={item.color}
                    size="small"
                  />
                }
              >
                <ListItemIcon sx={{ minWidth: '35px' }}> 
                <CircleIcon color={item.color} sx={{ fontSize: '14px' }} />
                </ListItemIcon>

               <ListItemText sx={{width:200}} >
                    <Typography variant="body1" color="black">
                      {item.task}
                    </Typography>
                  </ListItemText>

                  <ListItemText sx={{display:{xs:'none',md:'block'}}} >
                    <Typography variant="body1" color="black">
                     {item.date}
                    </Typography>
                  </ListItemText>
                  
                    
                
              </ListItem>

              {index !== deadlines.length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        <Box textAlign="right" mt={2}>
          <Button size="small">View All</Button>
        </Box>
      </CardContent>
    </Card>
     </Paper>
 
  );
}