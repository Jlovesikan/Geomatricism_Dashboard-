import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Navigate சேர்த்துள்ளேன்
import Employee from './Employee/Employee.jsx';
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import Project from './Project/Project.jsx';
import Task from './Task/Task.jsx';
import Login from './Login/Login.jsx';
import ProtectedLogin from './Login/ProductLogin.jsx';

let theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontFamily: 'Poppins, sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'Poppins, sans-serif', fontWeight: 600 },
    h3: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 },
    h4: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 },
    body1: { fontFamily: 'Inter, sans-serif' },
    button: { textTransform: 'none' },
  },
});

theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        
          <Route path="/login" element={<Login />} />
          
         
          <Route 
            path="/home" 
            element={<ProtectedLogin> <App /> </ProtectedLogin>} 
          />
          <Route 
            path="/employee" 
            element={<ProtectedLogin> <Employee /> </ProtectedLogin>} 
          />
          <Route 
            path="/project" 
            element={<ProtectedLogin> <Project /> </ProtectedLogin>} 
          />
          <Route 
            path="/task" 
            element={<ProtectedLogin> <Task /> </ProtectedLogin>} 
          />

          
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
          
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);