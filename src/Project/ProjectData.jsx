import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
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
    field: 'ProjectName',
    headerName: 'ProjectName',
    width: 200,
    editable: false,
  },
  {
    field: 'Client',
    headerName: 'Client',
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
    field: 'EndDate',
    headerName: 'EndDate',
    width: 110,
    editable: false,
  },
  {
    field: 'Assigned',
    headerName: 'Assigned',
    width: 110,
    editable: false,
   
  },

];



export default function ProjectData() {

const [rows, setRows] = useState([]);

//Read Data

useEffect(() => {

  const fetchProjects = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, "Projects"));

      console.log("Docs size:", querySnapshot.size);

      const ProjectData = querySnapshot.docs.map((doc) => {
    console.log("Doc ID:", doc.id);
    console.log("Doc Data:", doc.data());

    return {
    id: doc.id,
    ProjectName: doc.data(). ProjectName,
    Client: doc.data().Client,
    StartDate: doc.data().StartDate,
    EndDate: doc.data().EndDate,
    Assigned: doc.data().Assigned,
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

const handleEdit = (row) => {
  setEditData(row); // save data to edit
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
    <Typography variant="h6" mb={2}>Update Employee</Typography>

    <TextField
      fullWidth
      label="ProjectName"
      size="small"
      sx={{ mb: 1 }}
      value={editData?.ProjectName || ""}
      onChange={(e) => setEditData({ ...editData, ProjectName: e.target.value })}
    />
    <TextField
      fullWidth
      label="Client"
      size="small"
      sx={{ mb: 1 }}
      value={editData?.Client || ""}
      onChange={(e) => setEditData({ ...editData, Client: e.target.value })}
    />
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
    <TextField
      fullWidth
      label="EndDate"
      type='date'
      size="small"
      sx={{ mb: 1 }}
      value={editData?.EndDate || ""}
      onChange={(e) => setEditData({ ...editData, EndDate: e.target.value })}
        InputLabelProps={{
        shrink: true,
        }}
    />
    <TextField
      fullWidth
      label="Assigned"
      size="small"
      sx={{ mb: 2 }}
      value={editData?.Assigned || ""}
      onChange={(e) => setEditData({ ...editData, Assigned: e.target.value })}
    />

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button color="error" onClick={() => setEditOpen(false)}>Cancel</Button>
      <Button
        variant="contained"
        onClick={async () => {
          await updateDoc(doc(db, "Projects", editData.id), {
            ProjectName: editData.ProjectName,
            Client: editData.Client,
            StartDate: editData.StartDate,
            EndDate: editData.EndDate,
            Assigned: editData. Assigned,
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

