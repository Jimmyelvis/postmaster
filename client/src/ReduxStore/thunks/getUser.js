import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlertWithTimeout } from './setAlertWithTimeout';

const loginUser = createAsyncThunk('auth/loginUser', async ({userData, navigate},
  { dispatch}
  ) => {

  console.log('userData', userData);

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

    dispatch(setAlertWithTimeout({ msg: error.response.data.msg, alertType: 'danger' }));

    return rejectWithValue(error.response.data);
  } 
});

const registerUser = createAsyncThunk('auth/registerUser', async ({userData, navigate},
  { dispatch }
  ) => {

  console.log('userData', userData);

  try {
    const response = await axios.post('/api/register', userData);

    try {
      dispatch(loginUser({ userData, navigate }));
    }

    catch (error) {
      console.error(error);
    }

  }

  catch (error) {

 
    dispatch(setAlertWithTimeout({ msg: error.response.data.msg, alertType: 'danger' }));

    return rejectWithValue(error.response.data);
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

const handleToken = createAsyncThunk('auth/handleToken', async (token, {
  dispatch
}) => {
  try {
    const response = await axios.post('/api/stripe', token);
    dispatch(fetchUser());
    dispatch(setAlertWithTimeout({ msg: 'Credits Successfully Added', alertType: 'success' }));
  }

  catch (error) {
    console.error(error);
  }
});


export { loginUser, fetchUser, handleToken, registerUser }