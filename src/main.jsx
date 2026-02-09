import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employee from './Employee/Employee.jsx';
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';


import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import Project from './Project/Project.jsx';

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

      {/* 🔽 UNDERLINED CHANGE */}
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path='/' element={<App />} />

          {/* 🔽 UNDERLINED CHANGE (removed space & lowercase) */}
          <Route path='/employee' element={<Employee />} />
          <Route path='/project' element={<Project/>}/>
        </Routes>

      </ThemeProvider>

    </BrowserRouter>
  </StrictMode>
);
