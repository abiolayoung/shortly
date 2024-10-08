import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthModule = ({ onClose }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
        if(isSignIn) {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                form.email,
                form.password
              );
              const user = userCredential.user;
        }
        else {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
              );
              const user = userCredential.user;
        }
    } catch (err) {
        console.log(err)
       setError(err.message)
       setLoading(false)
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
        {isSignIn ? "Sign in" : "sign up"}
          <IconButton onClick={onClose} size="medium">
            <CloseIcon />
          </IconButton>
        </Box>
        </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: "24px" }}
          variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="email"
        />
        <TextField
          fullWidth
          variant="filled"
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
          label="password"
        />
        <Box color="red" mt={2}><Typography>{error}</Typography></Box>
      </DialogContent>
      <DialogActions>
        <Box
          mb={1}
          mx={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography onClick={() => setIsSignIn((o) => !o)}>
            {isSignIn ? "Don't have an account" : "Already have an account"}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22}/> :  isSignIn ? "Sign in" : "sign up"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModule;