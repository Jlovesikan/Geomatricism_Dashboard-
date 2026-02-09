import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { Grid, TextField, Typography, Alert } from "@mui/material";
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

export default function EmpAddDesign() {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    role: "",
  });


  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");
  const [alertType, setAlertType] = React.useState("success"); // success | error

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowAlert(false);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    // ❌ Validation first
    if (!formData.name || !formData.email || !formData.phone) {
      setAlertType("error");
      setAlertMsg("Name, Email and Phone are required fields");
      setShowAlert(true);
      return;
    }

    try {
      await addDoc(collection(db, "Employees "), {
        Name: formData.name,
        Email: formData.email,
        PhoneNo: formData.phone,
        Project: formData.project,
        Role: formData.role,
      });

      // ✅ Success
      setAlertType("success");
      setAlertMsg("Employee Added Successfully");
      setShowAlert(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        project: "",
        role: "",
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
        Add Employee
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
            <Typography variant="h5">Add Employee Details</Typography>
            <Typography variant="body2" color="text.secondary">
              Add employee information below
            </Typography>
          </Box>

          <form onSubmit={handleAddEmployee}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  size="small"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Grid>

              <Grid size={{md:6,xs:12}}>
                <TextField
                  fullWidth
                  label="Email"
                  size="small"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>

              <Grid size={{md:6,xs:12}}>
                <TextField
                  fullWidth
                  label="Phone No"
                  size="small"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </Grid>

              <Grid size={{md:6,xs:12}}>
                <TextField
                  fullWidth
                  label="Project"
                  size="small"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                />
              </Grid>

              <Grid size={{md:6,xs:12}}>
                <TextField
                  fullWidth
                  label="Role"
                  size="small"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
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
