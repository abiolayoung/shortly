import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/home";
import Account from "./components/accounts";
import QrCode from "./components/accounts/QrCode";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import { auth } from "./firebase";
import theme from "./theme";
import LinkRedirect from "./components/LinkRedirect";

const App = () => {
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(
    pathname === "/" || pathname === "/account" ? true : false
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <Routes>
        <Route exact path="/" element={user ? <Account /> : <Home />} />
        <Route path="/account" element={user ? <Account /> : <Home />} />
        <Route path="/generate-qr" element={user ? <QrCode /> : <Home />} />
        <Route path="/:shortCode" element={<LinkRedirect />} />
      </Routes>
      {/* </Router> */}
    </ThemeProvider>
  );
};

export default App;

