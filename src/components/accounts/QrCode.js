import { createContext, useContext, useState, useEffect } from "react";
import Navbar from "./navbar";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { saveAs } from 'file-saver'
import axios from "axios";

// 068d7e00-58d1-11ef-8d5d-cff9db25dd8a - API-Key from QR-Tiger

// create context
export const InputContext = createContext();

const QrCode = () => {
  const [color, setColor] = useState("#03142F");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [inputValue, setInputValue] = useState({
    url: "",
    color: "",
  });

  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //   update URL
  const handleChange = (event) => {
    setInputValue({ ...inputValue, url: event.target.value });
  };

  //   update color
  useEffect(() => {
    setInputValue({ ...inputValue, color: color });
  }, [color]);

  console.log(inputValue);

  // const apiKey = '068d7e00-58d1-11ef-8d5d-cff9db25dd8a';

  const config = {
    headers: {
      Authorization: "Bearer 068d7e00-58d1-11ef-8d5d-cff9db25dd8a",
    },
  };

  const bodyParameters = {
    colorDark: inputValue.color,
    qrCategory: "url",
    text: inputValue.url,
  };

  const getQrCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://qrtiger.com/api/qr/static",
        bodyParameters,
        config
      );
      setResponse(res.data.url);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    inputValue,
    setInputValue,
    getQrCode,
    response,
    loading,
    error,
  };

  console.log(response);
  const handleSubmit = () => getQrCode();
  const downloadImage = () => {
    saveAs(response, 'qrCode.png');
  }

  return (
    <InputContext.Provider value={value}>
      <Box bgcolor="#56B7BA" height="100vh">
        <Navbar />
        <Box
          bgcolor="#fff"
          style={{
            width: "80%",
            margin: "10% auto",
            borderRadius: "10px",
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
          }}
          mt={20}
        >
          <Grid container spacing={2} mx={2}>
            <Grid item style={{ width: "60%" }}>
              <Typography>Enter Your URL</Typography>
              <TextField
                id="outlined-basic"
                label="https://altschoolafrica.com"
                variant="outlined"
                fullWidth
                value={inputValue.url}
                onChange={handleChange}
              />
              <Box mt={3}>
                <Typography>Color</Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    mr={2}
                    style={{
                      width: "30px",
                      height: "20px",
                      cursor: "pointer",
                      border: "5px solid #DFDBDC",
                      backgroundColor: color,
                    }}
                    onClick={() => setDisplayColorPicker(!displayColorPicker)}
                  ></Box>
                  <span>{color}</span>
                </Box>
                {displayColorPicker && (
                  <Box mt={2}>
                    <ChromePicker
                      color={color}
                      onChange={(color) => setColor(color.hex)}
                    />
                  </Box>
                )}
              </Box>
              <Box
                marginTop="15%"
                style={{ marginLeft: "65%" }}
                onClick={handleSubmit}
              >
                <Button disableElevation variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={22} /> : "Generate QrCode"}
                </Button>
                {error ? <Typography>Sorry something went wrong</Typography> : ''}
              </Box>
            </Grid>
            <Grid
              item
              display="flex"
              flexDirection="column"
              alignItems="center"
              margin="auto"
            >
              {response ? (<img
                src={response}
                alt="qr-image"
                style={{ width: "150px", height: "150px" }}
              />) : (<Box>Your QR-code will show here...</Box>)}
              <Box my={2}>
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={downloadImage}
                >
                  Download QrCode
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </InputContext.Provider>
  );
};

export default QrCode;
