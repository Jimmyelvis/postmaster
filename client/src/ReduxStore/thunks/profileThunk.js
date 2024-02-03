import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertWithTimeout } from './setAlertWithTimeout';
import axios from 'axios';

const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  try {
    const response = await axios.get('/api/profile');

    console.log('response.data', response.data);
    return response.data;
  } 
  
  catch (error) {
    console.error(error);
  }
});

const createProfile = createAsyncThunk('profile/createProfile', async (profileData, { dispatch}) => {
  try {
    const response = await axios.post('/api/profile', profileData);

    console.log('response.data', response.data);
    dispatch(setAlertWithTimeout({ msg: 'Profile Created', alertType: 'success' }));
    // dispatch(fetchProfile());
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});

const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData, { dispatch}) => {
  try {
    const response = await axios.patch('/api/profile', profileData);

    console.log('response.data', response.data);
    dispatch(setAlertWithTimeout({ msg: 'Profile Updated', alertType: 'success' }));
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});

export { fetchProfile, updateProfile, createProfile };
