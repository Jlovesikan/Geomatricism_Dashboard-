import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import {Avatar, TextField, InputAdornment, Button, Container, Grid } from "@mui/material";
import {Dashboard as DashboardIcon,People as PeopleIcon,
Business as BusinessIcon,Task as TaskIcon,BarChart as BarChartIcon,
Settings as SettingsIcon,Logout as LogoutIcon,
ExpandLess,ExpandMore,} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import HomeCard from './welcomePage/homeCard'
import ProjectProgressChart from './welcomePage/lineChart'
import DonutChart from './welcomePage/pieChart'
import Deadlines from './welcomePage/leftDeadline'
import Calendar from './welcomePage/calander';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

const drawerWidth = 240;
function App() {
const [mobileOpen, setMobileOpen] = React.useState(false);
const [isClosing, setIsClosing] = React.useState(false);
const location = useLocation();
const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error)
    }
  };

const handleDrawerClose = () => {
setIsClosing(true);
setMobileOpen(false);
};

const handleDrawerTransitionEnd = () => {
setIsClosing(false);
};

const handleDrawerToggle = () => {
if (!isClosing) {
setMobileOpen(!mobileOpen);
}
};

const [openManagement, setOpenManagement] = React.useState(true);

const handleManagementClick = () => {
setOpenManagement(!openManagement);
};

const menuItems = [
{ text: "Dashboard",path:'/home', icon: <DashboardIcon sx={{ color: "#061a52" }} /> },
{
text: "Management",
icon: <PeopleIcon sx={{ color: "#e9b91d" }} />,
subItems: [
{ text: "Employees",path: '/employee', icon: <PeopleIcon /> },
{ text: "Projects",path: '/project', icon: <BusinessIcon /> },
{ text: "Tasks",path: '/task', icon: <TaskIcon />,},
],
},
{ text: "Reports", path: '/reports', icon: <BarChartIcon sx={{ color: "#ee5a2d" }} /> },
{ text: "Settings",path: '/setting', icon: <SettingsIcon /> },
{ text: "Logout",path: '/logout', icon: <LogoutIcon />,action:handleLogout },
];

const drawer = (
<Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
<Toolbar sx={{ p: 2, boxShadow:  "0 -4px 10px rgba(0,0,0,0.6)", }}>

<Typography variant="h6" fontWeight="bold">
GeoMatricim
</Typography>

</Toolbar>

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
<ListItemButton
key={i}
component={Link}              // ___UNDERLINE CHANGE___
to={sub.path}                 // ___UNDERLINE CHANGE___
selected={location.pathname === sub.path}
>
<ListItemIcon>{sub.icon}</ListItemIcon>
<ListItemText primary={sub.text} />
</ListItemButton>
))}
</List>
</Collapse>
</Box>
) : (
<ListItemButton
key={index}
component={Link}                  // ___UNDERLINE CHANGE___
to={item.path || '#'}             // ___UNDERLINE CHANGE___
>
<ListItemIcon>{item.icon}</ListItemIcon>
<ListItemText primary={item.text} />
</ListItemButton>
)
)}
</List>
<Box
sx={{
p: 1,
display: "flex",
alignItems: "center",
gap:2,
boxShadow: "0 -4px 10px rgba(0,0,0,0.12)",
bgcolor: "background.paper",
}}
>
<Avatar sx={{ mr: 1 }}>A</Avatar>
<Box>
<Typography  fontWeight="bold" sx={{
fontSize:'18px'
}}>Admin Name</Typography>
<Typography variant="caption">Admin Role</Typography>
</Box>
</Box>

</Box>
);



return (
<Box sx={{ display: 'flex' }}>
<CssBaseline />
<AppBar
position="fixed"
sx={{
width: { sm: `calc(100% - ${drawerWidth}px)` },
ml: { sm: `${drawerWidth}px` },
backgroundColor: '#fff',
}}
>
<Toolbar>
<IconButton
color="black"
aria-label="open drawer"
edge="start"
onClick={handleDrawerToggle}
sx={{ mr: 2, display: { sm: 'none' } }}
>
<MenuIcon />
</IconButton>
<Box 
sx={{ 
width: '100%', 
display: 'flex', 
justifyContent: 'space-between', // Dashboard-ஐ இடதுபுறமும், Search-ஐ வலதுபுறமும் தள்ளும்
alignItems: 'center',
paddingY: 1,
color:'#000',
}}
>
<Typography variant='h4' sx={{ fontWeight:'500',}}>
DashBoard
</Typography>

<TextField
placeholder="Search..."
size="small"
sx={{ width: {md:'300px',xs:'150px' }}} // Search Bar அகலம்
InputProps={{
startAdornment: (
<InputAdornment position="start">
  <SearchIcon />
</InputAdornment>
),
}}
/>
</Box>
</Toolbar>
</AppBar>
<Box
component="nav"
sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
aria-label="mailbox folders"
>
{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
<Drawer

variant="temporary"
open={mobileOpen}
onTransitionEnd={handleDrawerTransitionEnd}
onClose={handleDrawerClose}
sx={{
display: { xs: 'block', sm: 'none' },
'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
}}
slotProps={{
root: {
keepMounted: true, // Better open performance on mobile.
},
}}
>
{drawer}
</Drawer>
<Drawer
variant="permanent"
sx={{
display: { xs: 'none', sm: 'block' },
'& .MuiDrawer-paper': { boxSizing: 'border-box', width:drawerWidth},
}}
open
>
{drawer}
</Drawer>
</Box>

<Box
component="main"
sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } ,mt:1}}
>
<Toolbar />
<Grid 
container           
spacing={2}        
sx={{ height: '100%',

}}
>

<Grid size={{md:12}}>
<Box sx={{}}>
<HomeCard/>
</Box>
</Grid>

<Grid size={{md:8, xs:12,sm:12}}>
<Box sx={{ml:{md:2,xs:0},

}}>
<ProjectProgressChart/>
</Box>
</Grid>

<Grid size={{md:4,xs:12,sm:12}}>
<Box sx={{mr:{md:1,xs:0,sm:0},}}>
<DonutChart/>
</Box>
</Grid>

<Grid size={{md:8, xs:12,sm:12}}>
<Box sx={{ml:{md:2,xs:0},

}}>
<Deadlines/>
</Box>
</Grid>

<Grid size={{md:4,xs:12,sm:12}}>
<Box sx={{mr:{md:1,xs:0,sm:0},mb:5}}>
<Calendar/>
</Box>
</Grid>
</Grid>

</Box>
</Box>

);
}


export default App
