import {
  Typography,
  Button,
  Box,
  Grid,
  Hidden,
} from "@mui/material";
import AuthModule from "./AuthModule";
import { useState } from 'react'


const Home = () => {
  const [openAuthModule, setOpenAuthModule] = useState(false)

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor="#56B7BA"
      color="#fff"
      p={2}
      boxSizing="border-box"
    >
      {openAuthModule && <AuthModule onClose={() => setOpenAuthModule(false)} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">LinkZip</Typography>
        <Button variant="text" color="inherit" onClick={() => setOpenAuthModule(true)}>
          Login/Signup
        </Button>
      </Box>

      <Box flexGrow={1} display="flex" alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Sync, share, and simplify</Typography>
              <Box my={3}>
                <Typography>
                  Simplify your online presence with LinkZip. Organize, share,
                  and QR-sync your links in one place.
                </Typography>
              </Box>
              <Button
                disableElevation
                variant="contained"
                color="inherit"
                size="large"
                style={{ color: "#56B7BA" }}
                onClick={() => setOpenAuthModule(true)}
              >
                Get Started
              </Button>
            </Box>
          </Grid>

          <Hidden only="xs">
            <Grid item sm={6}>
              <img
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                src="/assets/linkzip.png"
                alt="mockup"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};


export default Home;
