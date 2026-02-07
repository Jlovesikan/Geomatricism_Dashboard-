import * as React from "react";
import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Typography,
  Paper,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const deadlines = [
  {
    task: "Foundation Work",
    date: "2026-02-5",
    priority: "High",
    color: "error",
  },
  {
    task: "Electrical Installation",
    date: "2026-04-12",
    priority: "Medium",
    color: "warning",
  },
  {
    task: "Safety Inspection",
    date: "2026-04-15",
    priority: "Low",
    color: "success",
  },
];

export default function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const filteredTasks = deadlines.filter(
    (item) => dayjs(item.date).format("YYYY-MM-DD") ===
              selectedDate.format("YYYY-MM-DD")
  );

  return (
<Paper elevation={3}>
      <Card 
  sx={{
    maxHeight:'301px', 
   
    display: 'flex', 
    flexDirection: 'column',
    overflow: 'hidden'    // Keeps the calendar from breaking the square
  }}
>
  <CardHeader 
    title="Upcoming Deadlines" 
    titleTypographyProps={{ variant: 'h6' }}
    sx={{ 
      pb: 0,              // Removes bottom padding of header
      '& .MuiCardHeader-content': { mb: 0 } 
    }} 
  />

  <CardContent sx={{ 
    flexGrow: 1, 
    overflowY: 'auto',    // Makes task list scrollable if it exceeds square height
    pt: 0,                // Reduces space between header and calendar
    '&:last-child': { pb: 2 } 
  }}>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        sx={{ 
          width: '100%', 
          maxHeight: '200px', // Prevents calendar from pushing content out
          margin: 0           // Removes default calendar margins
        }}
      />
    </LocalizationProvider>

    <Typography variant="subtitle2"  sx={{ mt: 1, mb: 0.5 }}>
      Tasks on {selectedDate.format("DD MMM")}
    </Typography>

    {filteredTasks.length === 0 ? (
      <Typography variant="caption" color="text.secondary">
        No tasks
      </Typography>
    ) : (
      <List disablePadding>
        {filteredTasks.map((item, index) => (
          <ListItem
            key={index}
            sx={{ py: 0.5, px: 0 }} // Tightens the task list items
            secondaryAction={
              <Chip label={item.priority} color={item.color} size="small" />
            }
          >
            <ListItemText 
              primary={item.task} 
              primaryTypographyProps={{ variant: 'body2', noWrap: true }} 
            />
          </ListItem>
        ))}
      </List>
    )}
  </CardContent>
</Card>
</Paper>
  );
}