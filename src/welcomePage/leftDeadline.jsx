import React, { useEffect, useState } from "react";
import {
Card, CardHeader, CardContent, List, ListItem, ListItemText,
Chip, Box, Typography, Divider, Button, Paper, ListItemIcon, CircularProgress
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config"; 

export default function Deadlines() {
const [deadlines, setDeadlines] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const q = query(collection(db, "Task"), orderBy("DueDate", "asc"));

const unsubscribe = onSnapshot(q, (snapshot) => {
const today = new Date();
today.setHours(0, 0, 0, 0); 

const fetchedData = snapshot.docs.map(doc => {
const data = doc.data();
const taskDate = new Date(data.DueDate.replace(/\./g, '-')); 


const diffTime = taskDate - today;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

let priority = "Low";
let color = "success";

if (diffDays <= 0) {
priority = "High";
color = "error";
} else if (diffDays <= 3) {
priority = "Medium";
color = "warning";
}

return {
id: doc.id,
task: data.TaskName || "No Title", 
date: data.DueDate,
priority: priority,
color: color,
daysLeft: diffDays
};
});


setDeadlines(fetchedData.slice(0, 3));
setLoading(false);
});

return () => unsubscribe();
}, []);

if (loading) return <CircularProgress sx={{ m: 5 }} />;

return (
<Paper elevation={3} >
<Card sx={{ height: "100%", width: '100%' }}>
<CardHeader title="Upcoming Deadlines" />
<CardContent>
<List disablePadding>
{deadlines.map((item, index) => (
<Box key={item.id}>
<ListItem
secondaryAction={
<Chip
sx={{ width: 90 }}
label={item.priority}
color={item.color}
size="small"
/>
}
>
<ListItemIcon sx={{ minWidth: '35px' }}>
<CircleIcon color={item.color} sx={{ fontSize: '14px' }} />
</ListItemIcon>

<ListItemText sx={{ width: 200 }}>
<Typography variant="body2" fontWeight="500">
{item.task}
</Typography>
</ListItemText>

<ListItemText sx={{ display: { xs: 'none', md: 'block' } }}>
<Typography variant="body2" color="textSecondary">
{item.date === new Date().toISOString().split('T')[0].replace(/-/g, '.') ? "Today" : item.date}
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