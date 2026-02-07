import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Collapse,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Task as TaskIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function SideBar({ mobileOpen, handleDrawerToggle }) {
  const [openManagement, setOpenManagement] = React.useState(true);

  const handleManagementClick = () => {
    setOpenManagement(!openManagement);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon sx={{ color: "#061a52" }} /> },
    {
      text: "Management",
      icon: <PeopleIcon sx={{ color: "#e9b91d" }} />,
      subItems: [
        { text: "Employees", icon: <PeopleIcon /> },
        { text: "Projects", icon: <BusinessIcon /> },
        { text: "Tasks", icon: <TaskIcon /> },
      ],
    },
    { text: "Reports", icon: <BarChartIcon sx={{ color: "#ee5a2d" }} /> },
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Logout", icon: <LogoutIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* Logo */}
      <Box sx={{ p: 2, boxShadow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          GeoMatricim
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) =>
          item.subItems ? (
            <Box key={index}>
              <ListItemButton onClick={handleManagementClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {openManagement ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={openManagement}>
                <List sx={{ pl: 4 }}>
                  {item.subItems.map((sub, i) => (
                    <ListItemButton key={i}>
                      <ListItemIcon>{sub.icon}</ListItemIcon>
                      <ListItemText primary={sub.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )
        )}
      </List>

      {/* Profile */}
      <Box sx={{ p: 1, display: "flex", alignItems: "center", boxShadow: 1 }}>
        <Avatar sx={{ mr: 1 }}>A</Avatar>
        <Box>
          <Typography fontWeight="bold">Admin Name</Typography>
          <Typography variant="caption">Admin Role</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* ________ CHANGE: MOBILE DRAWER ________ */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
