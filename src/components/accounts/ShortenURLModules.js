import React from "react";
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
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ShortenURLModules = ({ handleClose, createShortenLink }) => {
  const [errors, setErrors] = useState({
    name: "",
    longUrl: "",
  });
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = async () => {
    const errors = {};
    const trimName = form.name.trim();
    const trimLongUrl = form.longUrl.trim();

    const expression =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    if (trimName.length < 3 || trimName > 20) {
      errors.name = "The name should be min of 3 and max of 20 characters long";
    }
    if (!regex.test(trimLongUrl)){
      errors.longUrl = "URL is invalid";
    };

    if(!!Object.keys(errors).length) return setErrors(errors)

    setLoading(true);
    try {
      setTimeout(() => createShortenLink(trimName, trimLongUrl), 1000)
    }catch(err){
      setLoading(false)
    }
  };

  console.log(errors)

  return (
    <Dialog open={true} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Shorten URL
          <IconButton onClick={handleClose} size="medium">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            fullWidth
            variant="filled"
            label="Name"
            name="name"
            onChange={handleChange}
          />
        </Box>
        <TextField
          error={!!errors.longUrl}
          helperText={errors.longUrl}
          value={form.longUrl}
          fullWidth
          variant="filled"
          label="Long URL"
          name="longUrl"
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Box mr={2} my={1}>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading}
          >
           {loading ? <CircularProgress size={22}/> : "Create Short Url"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModules;
