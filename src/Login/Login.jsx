import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { auth } from "../firebase/config"; // உங்கள் ஃபைல் பார்த்தை சரியாகக் கொடுக்கவும்
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {



    const navigate = useNavigate();

  const handleLogin = async () => {
    
    if (emailError || passwordError || !email || !password) {
      alert("Please Check the details!");
      return;
    }

    try {
     
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      
    
      navigate("/home"); 
      
    } catch (error) {
      
      if (error.code === 'auth/user-not-found') {
        alert("invalid Email!");
      } else if (error.code === 'auth/wrong-password') {
        alert("invaild Passwwrod!");
      } else {
        alert("Wrong: " + error.message);
      }
    }
  };
    const [email,setEmail]=useState('');
    const [emailError,setEmailError]=useState('');
  const handleEmail = (e) => {
    const val = e.target.value; // e.target.value தான் பயன்படுத்த வேண்டும்
    setEmail(val);
    if (val === "") {
      setEmailError("");
    } else if (!validate(val)) {
      setEmailError("Not a valid email");
    } else {
      setEmailError("");
    }
  };

    const validate=(email)=>{
       const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       return(emailRegex.test(email))
    }

     
    const [password,setPassword]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val === "") {
      setPasswordError("");
    }else if (val.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };
  return (
    <Box path="/login">
      <Grid
        container
        size={6}
        direction="row"
        sx={{ width: "100vw", height: "100vh" }}
      >
        <Grid size={{md:6,xs:12}}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="sm">
              <Paper
                elevation={3}
                sx={{
                  height: "100%",
                  width:'100%',
                  px: 5,
                  py: 5,
                }}
              >
                <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid size={12} >
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" color="#092880">Welcome Back..</Typography>
                      <Typography variant="h4" color="#092880">Login</Typography>
                    </Box>
                  </Grid>
                  <Grid size={12} >
                    <TextField  
                    fullWidth 
                    label="Email" 
                    id="fullWidth"
                    variant="outlined"
                    value={email}
                    onChange={handleEmail}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    
                      sx={{

                      "& .MuiInputBase-input": {
                      color: "#092880", 
                      caretColor: "#092880", 
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                      color: "#092880",
                      },

                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#092880",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#092880",
                      },
                      
                      }}

                    />
                  </Grid>
                  <Grid size={12}>
                      <TextField  
                    fullWidth 
                    type="password"
                    label="Password" 
                    id="Password"
                    value={password}
                    autoComplete="new-password"
                    onChange={handlePassword}
                    error={Boolean(passwordError)}
                    helperText={passwordError} 


                    sx={{

                      "& .MuiInputBase-input": {
                      color: "#092880", 
                      caretColor: "#092880", 
                      },

                      "& .MuiInputLabel-root.Mui-focused": {
                      color: "#092880",
                      },

                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#092880",
                      },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#092880",
                      },
                      
                      }}
                    />
                  </Grid>
                  <Grid size={12}  >
                    <Button
                      fullWidth
                      variant="contained"
                      disableElevation
                      type="submit"
                      onClick={handleLogin}
                      sx={{
                        bgcolor:'#092880'
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        </Grid>
        <Grid size={{md:6}} sx={{display:{md:'block',xs:'none'}}}>
          <Box
            sx={{
              bgcolor: "#092880",
              width: "100%",
              height: "100%",
              borderBottomLeftRadius:'100%',
             
            }}
          >
           <Typography variant="h3" color="#fff"
           sx={
            {
              textAlign:'center',
              pt:10,
            }
           }
           >
            Welcome To Admin DashBoard..!
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
