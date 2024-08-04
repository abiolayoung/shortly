import React from "react";
import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";



const Home = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));


    const handleSignup = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }
    

  return (
    <>
      <Typography>Home</Typography>
      <TextField
        value={form.email}
        name="email"
        onChange={handleChange}
        label="email"
      />
      <TextField
        type='password'
        value={form.password}
        name="password"
        onChange={handleChange}
        label="password"
      />
      <Button onClick={handleSignup}>Sign up</Button>
    </>
  );
};

export default Home;
