import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Home = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setForm((oldForm) => ({ ...oldForm, [event.target.name]: event.target.value }));
  };

  const handleSignup = async () => {
    try {
      if (!form.email || !form.password) {
        setError('Please fill in both fields');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignin = async () => {
    try {
      if (!form.email || !form.password) {
        setError('Please fill in both fields');
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Typography>Home</Typography>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TextField value={form.email} name="email" onChange={handleChange} label="email" />
      <TextField type="password" value={form.password} name="password" onChange={handleChange} label="password" />
      <Button onClick={handleSignup}>Sign up</Button>
      <Button onClick={handleSignin}>Sign In</Button>
    </>
  );
};

export default Home;
