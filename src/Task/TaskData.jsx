import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button, Chip, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { deleteDoc, doc,updateDoc  } from "firebase/firestore";
import { Style } from '@mui/icons-material';
// import { useNavigate } from "react-router-dom";

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





const columns = [

  {
    field: 'TaskName',
    headerName: 'TaskName',
    width: 200,
    editable: false,
  },
  {
    field: 'Project',
    headerName: 'Project',
    width: 200,
    editable: false,
  },
   {
    field: 'Employee',
    headerName: 'Employee',
    width: 200,
    editable: false,
  },
    {
    field: 'StartDate',
    headerName: 'StartDate',
    width: 150,
    editable: false,
  },
  {
    field: 'DueDate',
    headerName: 'DueDate',
    width: 110,
    editable: false,
  },
  
{
  field: 'Status',
  headerName: 'Status',
  width: 150,
  renderCell: (params) => {
    let color = 'default';

    switch (params.value) {
      case 'complete':
        color = 'success';   // MUI predefined color
        break;
      case 'progress':
        color = 'primary';
        break;
      case 'cancel':
        color = 'error';
        break;
      case 'on hold':
        color = 'warning';
        break;
      default:
        color = 'default';
    }

    return <Chip label={params.value} color={color} />;
  },
}


];



export default function TaskData() {

const [rows, setRows] = useState([]);


//Read Data


useEffect(() => {

const fetchProjects = async () => {
try {

const querySnapshot = await getDocs(collection(db, "Task"));

console.log("Docs size:", querySnapshot.size);

const ProjectData = querySnapshot.docs.map((doc) => {
console.log("Doc ID:", doc.id);
console.log("Doc Data:", doc.data());

return {
id: doc.id,
TaskName: doc.data().TaskName,
Project: doc.data().Project,
StartDate: doc.data().StartDate,
Employee: doc.data().Employee,
DueDate: doc.data().DueDate,
 Status: doc.data().Status || "progress",// ✅ ADD
};
});

console.log("Final rows:", ProjectData);
setRows(ProjectData);

} catch (error) {

console.error("Fetch error:", error);

}
};

fetchProjects();
}, []);



//Read Data end

//Delete Data

const handleDelete = async (id) => {
const confirm = window.confirm("Are you sure delete this Projects?");
if (!confirm) return;

await deleteDoc(doc(db, "Projects", id));
setRows((prev) => prev.filter((row) => row.id !== id));
};

//Delete Data end 





const [editOpen, setEditOpen] = useState(false);
const [editData, setEditData] = useState(null);

const handleEdit = (rows) => {
  setEditData(rows); // save data to edit
  setEditOpen(true); // open modal
}

return (
<Paper elevation={3} >


<Box sx={{ height: 400, width: '100%' }}>

<DataGrid

rows={rows}
columns={[
...columns,
{
field: "actions",
headerName: "Actions",
width: 140,
renderCell: (params) => (
<Box sx={{ display: "flex", justifyContent: "center" }}>
<IconButton
color="primary"
onClick={() => handleEdit(params.row)}
>
<EditIcon />
</IconButton>

<IconButton
color="error"
onClick={() => handleDelete(params.id)}
>
<DeleteIcon />
</IconButton>
</Box>
),
},
]}

/>

<Modal open={editOpen} onClose={() => setEditOpen(false)}>

<Box sx={style}>

<Box sx={{ mb: 3 }}>

<Typography variant="h5">Update Task Details</Typography>
<Typography variant="body2" color="text.secondary">
Update Task information below
</Typography>

</Box>


<Grid container spacing={2}>

<Grid size={12}>

<TextField
fullWidth
label="TaskName"
size="small"
sx={{ mb: 1 }}
value={editData?.TaskName || ""}
onChange={(e) => setEditData({ ...editData, TaskName: e.target.value })}
/>

</Grid>

<Grid size={12}>

<TextField
fullWidth
label="Project"
size="small"
sx={{ mb: 1 }}
value={editData?.Project || ""}
onChange={(e) => setEditData({ ...editData, Project: e.target.value })}
/>

</Grid>

<Grid size={12}>

<TextField
fullWidth
label="Employee"
size="small"
sx={{ mb: 1 }}
value={editData?.Employee || ""}
onChange={(e) => setEditData({ ...editData, Employee: e.target.value })}
/>

</Grid>

<Grid size={12}>

<TextField
fullWidth
label="StartDate"
type='date'
size="small"
sx={{ mb: 1 }}
value={editData?.StartDate || ""}
onChange={(e) => setEditData({ ...editData, StartDate: e.target.value })}
InputLabelProps={{
shrink: true,
}}
/>

</Grid>


<Grid size={12}>

<TextField
fullWidth
label="DueDate"
type='date'
size="small"
sx={{ mb: 1 }}
value={editData?.DueDate || ""}
onChange={(e) => setEditData({ ...editData, DueDate: e.target.value })}
InputLabelProps={{
shrink: true,
}}
/>

</Grid>

<Grid size={12}>

<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Status</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
value={editData?.Status || ''}
label="Status"
onChange={(e) => setEditData({ ...editData, Status: e.target.value })}
>
<MenuItem value={'complete'}>complete</MenuItem>
<MenuItem value={'progress'}>progress</MenuItem>
<MenuItem value={'on hold'}>on hold</MenuItem>
<MenuItem value={'cancel'}>cancel</MenuItem>
</Select>
</FormControl>

</Grid>
</Grid> 


<Box sx={{ display: "flex", justifyContent: "space-between",mt:1 }}>
<Button color="error" onClick={() => setEditOpen(false)}>Cancel</Button>
<Button
variant="contained"
onClick={async () => {
await updateDoc(doc(db, "Task", editData.id), {
TaskName: editData.TaskName,
Project: editData.Project,
Employee: editData.Employee,
StartDate: editData.StartDate,
DueDate: editData.DueDate,
Status: editData.Status,
});
setRows((prev) =>
prev.map((r) => (r.id === editData.id ? editData : r))
);
setEditOpen(false);
}}
>
Update
</Button>
</Box>
</Box>
</Modal>


</Box>


</Paper>
);
}

