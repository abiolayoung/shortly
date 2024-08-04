import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import Home from './components/home'
import Account from "./components/accounts";
import { ThemeProvider, CircularProgress, Box } from '@mui/material'
import { auth } from './firebase'
import theme from './theme'

const App = () => {
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true)

 useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
    setUser(user);
    setInitialLoad(false)
  })
 }, [])

 if(initialLoad) return (
  <Box mt={5} display="flex" justifyContent="center">
    <CircularProgress />
  </Box>
 )

  return(
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route exact path="/" element={user ? <Account/> : <Home/>} />
        <Route path="/account" element={ user ? <Account/> : <Home/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
