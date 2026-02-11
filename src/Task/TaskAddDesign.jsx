import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { Grid, TextField, Typography, Alert,FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const style = {
position: "absolute",
top: "50%",
left: "50%",
transform: "translate(-50%, -50%)",
width: "60%",
bgcolor: "background.paper",
boxShadow: 24,
p: 4,
};

export default function TaskAddDesign() {
const [open, setOpen] = React.useState(false);

const [formData, setFormData] = React.useState({
TaskName: "",
Project: "",
Employee: "",
StartDate: "",
DueDate: "",
Status:'',
});


const [showAlert, setShowAlert] = React.useState(false);
const [alertMsg, setAlertMsg] = React.useState("");
const [alertType, setAlertType] = React.useState("success"); // success | error

const handleOpen = () => setOpen(true);
const handleClose = () => {
setOpen(false);
setShowAlert(false);
};

const handleAddProject = async (e) => {
e.preventDefault();

// ❌ Validation first
if (!formData.TaskName || !formData.Project || !formData.Employee ) {
setAlertType("error");
setAlertMsg("ProjectName, Client and Assigned are required fields");
setShowAlert(true);
return;
}

try {
await addDoc(collection(db, "Task"), {
TaskName: formData.TaskName,
Project: formData. Project,
Employee: formData.Employee,
StartDate: formData.StartDate,
DueDate: formData.DueDate,
Status: formData. Status,
});

// ✅ Success
setAlertType("success");
setAlertMsg("Task Added Successfully");
setShowAlert(true);

setFormData({
TaskName: "",
Project: "",
Employee: "",
StartDate: "",
DueDate: "",
Status:'',
});
} catch {
setAlertType("error");
setAlertMsg("Something went wrong. Please try again!");
setShowAlert(true);
}
};

return (
<div>
<Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
AddTask
</Button>

<Modal open={open} onClose={handleClose}>
<Box sx={style}>
{/* 🔔 Alert inside modal */}
{showAlert && (
<Alert
severity={alertType}
sx={{ mb: 2 }}
onClose={() => setShowAlert(false)}
>
{alertMsg}
</Alert>
)}

<Box sx={{ mb: 2 }}>
<Typography variant="h5">Add Task Details</Typography>
<Typography variant="body2" color="text.secondary">
Add Task information below
</Typography>
</Box>

<form onSubmit={ handleAddProject}>
<Grid container spacing={2}>
<Grid size={12}>
<TextField
fullWidth
label="TaskName"
size="small"
value={formData.TaskName}
onChange={(e) =>
setFormData({ ...formData, TaskName: e.target.value })
}
/>
</Grid>

<Grid size={{md:6,xs:12}}>
<TextField
fullWidth
label="Project"
size="small"
value={formData.Project}
onChange={(e) =>
setFormData({ ...formData, Project: e.target.value })
}
/>
</Grid>
<Grid size={{md:6,xs:12}}>
<TextField
fullWidth
label="Employee"
size="small"
value={formData.Employee}
onChange={(e) =>
setFormData({ ...formData, Employee: e.target.value })
}
/>
</Grid>

<Grid size={{md:6,xs:12}}>
<TextField
fullWidth
label="Start Date"
type="date"
size="small"
value={formData.StartDate}
onChange={(e) =>
setFormData({ ...formData, StartDate: e.target.value })
}
InputLabelProps={{
shrink: true,
}}
/>
</Grid>

<Grid size={{md:6,xs:12}}>
<TextField
fullWidth
label="DueDate"
size="small"
type="date"
value={formData.DueDate}
onChange={(e) =>
setFormData({ ...formData, DueDate: e.target.value })
}
InputLabelProps={{
shrink: true,
}}
/>
</Grid>

<Grid size={{md:12,xs:12}}>
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Status</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
value={FormData.Status}
label="Status"
onChange={(e) =>
setFormData({ ...formData, Status: e.target.value })
}
>
<MenuItem value={'complete'}>complete</MenuItem>
<MenuItem value={'progress'}>progress</MenuItem>
<MenuItem value={'on hold'}>on hold</MenuItem>
</Select>
</FormControl>
</Grid>
</Grid>

<Box
sx={{
display: "flex",
justifyContent: "space-between",
mt: 3,
}}
>
<Button variant="outlined" color="error" onClick={handleClose}>
Close
</Button>

<Button type="submit" variant="contained" color="success">
Add
</Button>
</Box>
</form>
</Box>
</Modal>
</div>
);
}
