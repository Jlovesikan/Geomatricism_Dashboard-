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

export default function ProjectAddDesign() {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    ProjectName: "",
    Client: "",
    StartDate: "",
    EndDate: "",
    Assigned: "",
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
    if (!formData.ProjectName || !formData.Client || !formData.Assigned) {
      setAlertType("error");
      setAlertMsg("ProjectName, Client and Assigned are required fields");
      setShowAlert(true);
      return;
    }

    try {
      await addDoc(collection(db, "Projects"), {
        ProjectName: formData.ProjectName,
        Client: formData. Client,
        StartDate: formData.StartDate,
        EndDate: formData.EndDate,
        Assigned: formData.Assigned,
      });

      // ✅ Success
      setAlertType("success");
      setAlertMsg("Employee Added Successfully");
      setShowAlert(true);

      setFormData({
        ProjectName: "",
        Client: "",
        StartDate: "",
        EndDate: "",
        Assigned: "",
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
        AddProject
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
            <Typography variant="h5">Add Project Details</Typography>
            <Typography variant="body2" color="text.secondary">
              Add Project information below
            </Typography>
          </Box>

          <form onSubmit={ handleAddProject}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="ProjectName"
                  size="small"
                  value={formData.ProjectName}
                  onChange={(e) =>
                    setFormData({ ...formData, ProjectName: e.target.value })
                  }
                />
              </Grid>

              <Grid size={{md:6,xs:12}}>
                <TextField
                  fullWidth
                  label="Client"
                  size="small"
                  value={formData.Client}
                  onChange={(e) =>
                    setFormData({ ...formData, Client: e.target.value })
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
                  label="EndDate"
                  size="small"
                  type="date"
                  value={formData.EndDate}
                  onChange={(e) =>
                    setFormData({ ...formData, EndDate: e.target.value })
                  }
                   InputLabelProps={{
                shrink: true,
                }}
                />
              </Grid>

              <Grid size={{md:6,xs:12}}>
                <TextField
                  fullWidth
                  label="Assigned"
                  size="small"
                  value={formData.Assigned}
                  onChange={(e) =>
                    setFormData({ ...formData, Assigned: e.target.value })
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
