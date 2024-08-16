import { createContext, useContext, useState, useEffect } from "react";
import Navbar from "./navbar";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { ChromePicker } from "react-color";


// 068d7e00-58d1-11ef-8d5d-cff9db25dd8a - API-Key from QR-Tiger

// create context
export const InputContext = createContext();

const QrCode = () => {
  const [color, setColor] = useState("#03142F");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [inputValue, setInputValue] = useState({
    url: '',
    color: ''
  })

  const value = {
    inputValue,
    setInputValue
  }

//   update URL
  const handleChange = (event) => {
     setInputValue({...inputValue, url: event.target.value})
  }

//   update color 
useEffect(() => {
   setInputValue({...inputValue, color: color})
}, [color])

console.log(inputValue)

const apiKey = '068d7e00-58d1-11ef-8d5d-cff9db25dd8a';
const apiUrl = 'https://qrcode-tiger.com/api/qr/static';

// const data = {
//     "size": 500,
//     "colorDark": "rgb(5,64,128)",
//     "logo": "scan_me.png",
//     "eye_outer": "eyeOuter2",
//     "eye_inner": "eyeInner1",
//     "qrData": "pattern0",
//     "backgroundColor": "rgb(255,255,255)",
//     "transparentBkg": false,
//     "qrCategory": "url",
//     "text": "https://qrcode-tiger.com"
// }

// const res = async () => {
//     try {
//        const response = await fetch  (apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json',
//                 'Authorization' : `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(data)
//         })
//         const result = await response.json()
//         console.log(result)
//     }catch (error){
//         console.log(error)
//     }
// } 
// res();


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
                <Box marginTop="15%" style={{ marginLeft: "65%" }}>
                  <Button disableElevation variant="contained" color="primary">
                    Generate QrCode
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="auto"
              >
                <img src="/assets/QrCode.png" alt="qr-image" />
                <Box mb={2}>
                    <Button disableElevation variant="contained" color="primary">
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
