import React from 'react'
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar elevation={0} color="secondary" position='static'>
        <Toolbar>
          <Typography variant="h6">LinkZip</Typography>
          <Box ml="auto">
            <Button variant="text" color="inherit">
              Links
            </Button>
            <Button variant="text" color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar;
