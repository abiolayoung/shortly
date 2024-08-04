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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const ShortenURLModules = ({ handleClose, createShortenLink }) => {
  const [form, setForm] = useState({
    name: "",
    longUrl: "",
  });

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

    const handleSubmit = () => {
     createShortenLink(form.name, form.longUrl)
    }


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
            value={form.name}
            fullWidth
            variant="filled"
            label="Name"
            name="name"
            onChange={handleChange}
          />
        </Box>
        <TextField
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
          >
            Shorten URL
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ShortenURLModules;
