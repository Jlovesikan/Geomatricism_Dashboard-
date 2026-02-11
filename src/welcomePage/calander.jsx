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
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config"; 

export default function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs());
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Projects"), (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = projects
    .filter((item) => {
      if (!item.EndDate) return false;
      const formattedEndDate = item.EndDate.replace(/\./g, "-");
      return dayjs(formattedEndDate).format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD");
    })
    .map((item) => {
      
      const today = dayjs().startOf('day');
      const targetDate = dayjs(item.EndDate.replace(/\./g, "-")).startOf('day');
      const diffDays = targetDate.diff(today, 'day');

      let priority = "Low";
      let color = "success";

      if (diffDays <= 0) {
        priority = "High";
        color = "error";
      } else if (diffDays <= 3) {
        priority = "Medium";
        color = "warning";
      }

      return { ...item, calculatedPriority: priority, priorityColor: color };
    })
    .slice(0, 1);

  return (
    <Paper elevation={3}>
      <Card
        sx={{
          maxHeight: "285px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", 
        }}
      >
        <CardHeader
          title="Upcoming Deadlines"
          titleTypographyProps={{ variant: "h6" }}
          sx={{
            pb: 0,
            "& .MuiCardHeader-content": { mb: 0 },
          }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pt: 0,
            "&:last-child": { pb: 2 },
            "&::-webkit-scrollbar": { width: "5px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "10px" },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{
                width: "100%",
                maxHeight: "200px",
                margin: 0,
              }}
            />
          </LocalizationProvider>

          <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5 }}>
            Project on {selectedDate.format("DD MMM")}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={20} />
            </Box>
          ) : filteredTasks.length === 0 ? (
            <Typography variant="caption" color="text.secondary">
              No Project
            </Typography>
          ) : (
            <List disablePadding>
              {filteredTasks.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{ py: 0.5, px: 0 }}
                  secondaryAction={
                    <Chip 
                      label={item.calculatedPriority} 
                      color={item.priorityColor} 
                      size="small" 
                    />
                  }
                >
                  <ListItemText
                    primary={item.ProjectName || "Untitled"}
                    primaryTypographyProps={{ variant: "body2", noWrap: true }}
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