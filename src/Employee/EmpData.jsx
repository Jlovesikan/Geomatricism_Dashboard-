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
    field: 'Name',
    headerName: 'Name',
    width: 200,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: false,
  },
    {
    field: 'Phone',
    headerName: 'Number',
    width: 150,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 110,
    editable: false,
  },
  {
    field: 'project',
    headerName: 'Project',
    width: 110,
    editable: false,
   
  },

];



export default function EmpData() {

const [rows, setRows] = useState([]);

//Read Data

useEffect(() => {

  const fetchEmployees = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, "Employees "));

      console.log("Docs size:", querySnapshot.size);

      const empData = querySnapshot.docs.map((doc) => {
    console.log("Doc ID:", doc.id);
    console.log("Doc Data:", doc.data());

    return {
    id: doc.id,
    Name: doc.data().Name,
    email: doc.data().Email,
    Phone: doc.data().PhoneNo,
    role: doc.data().Role,
    project: doc.data().Project,
    };
      });

      console.log("Final rows:", empData);
      setRows(empData);

    } catch (error) {

      console.error("Fetch error:", error);

    }
  };

fetchEmployees();
}, []);

//Read Data end

//Delete Data

const handleDelete = async (id) => {
const confirm = window.confirm("Are you sure delete this employee?");
if (!confirm) return;

await deleteDoc(doc(db, "Employees ", id));
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
      label="Name"
      size="small"
      sx={{ mb: 1 }}
      value={editData?.Name || ""}
      onChange={(e) => setEditData({ ...editData, Name: e.target.value })}
    />
    <TextField
      fullWidth
      label="Email"
      size="small"
      sx={{ mb: 1 }}
      value={editData?.email || ""}
      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
    />
    <TextField
      fullWidth
      label="Phone"
      size="small"
      sx={{ mb: 1 }}
      value={editData?.Phone || ""}
      onChange={(e) => setEditData({ ...editData, Phone: e.target.value })}
    />
    <TextField
      fullWidth
      label="Role"
      size="small"
      sx={{ mb: 1 }}
      value={editData?.role || ""}
      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
    />
    <TextField
      fullWidth
      label="Project"
      size="small"
      sx={{ mb: 2 }}
      value={editData?.project || ""}
      onChange={(e) => setEditData({ ...editData, project: e.target.value })}
    />

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button color="error" onClick={() => setEditOpen(false)}>Cancel</Button>
      <Button
        variant="contained"
        onClick={async () => {
          await updateDoc(doc(db, "Employees ", editData.id), {
            Name: editData.Name,
            Email: editData.email,
            PhoneNo: editData.Phone,
            Role: editData.role,
            Project: editData.project,
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

