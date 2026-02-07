import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// MUI imports
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material';

// Fonts via @fontsource
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';

// Create theme
let theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif', // Body font
    h1: { fontFamily: 'Poppins, sans-serif', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontFamily: 'Poppins, sans-serif', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontFamily: 'Poppins, sans-serif', fontWeight: 500, lineHeight: 1.3 },
    h4: { fontFamily: 'Poppins, sans-serif', fontWeight: 500, lineHeight: 1.4 },
    h5: { fontFamily: 'Poppins, sans-serif', fontWeight: 400, lineHeight: 1.4 },
    h6: { fontFamily: 'Poppins, sans-serif', fontWeight: 400, lineHeight: 1.5 },
    body1: { fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: 1.6 },
    button: { fontFamily: 'Inter, sans-serif', textTransform: 'none' }, // Prevent uppercase buttons
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
