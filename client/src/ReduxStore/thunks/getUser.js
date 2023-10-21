import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const loginUser = createAsyncThunk('auth/loginUser', async ({userData, navigate}) => {
  try {
    const response = await axios.post('/api/login', userData);
    
    try {
      const response = await axios.get('/api/current_user');
      navigate('/dashboard');
      return response.data;
    } 
    
    catch (error) {
      console.error(error);
    }
    
  } 
  
  catch (error) {
    console.error(error);
  } 
});

const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const response = await axios.get('/api/current_user');
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});


export { loginUser, fetchUser }