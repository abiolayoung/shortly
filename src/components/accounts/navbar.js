import React from 'react'
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import { auth } from "../../firebase"
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
  const navigate = useNavigate();


  const qrRedirect = () => {
    navigate('/generate-qr');
  };

  const linkRedirect = () => {
    navigate('/account')
  }


  return (
    <AppBar elevation={0} color="secondary" position='static'>
        <Toolbar>
          <Typography variant="h6">LinkZip</Typography>
          <Box ml="auto">
            <Button variant="text" color="inherit" onClick={linkRedirect}>
              Links
            </Button>
            <Button variant="text" color="inherit" onClick={qrRedirect}>
              QR-Code
            </Button>
            <Button onClick={() => auth.signOut()} variant="text" color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar;
