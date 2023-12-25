import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  try {
    const response = await axios.get('/api/profile/emails');
    return response.data;
  } 
  
  catch (error) {
    console.error(error);
  }
});

const addEmail = createAsyncThunk('emails/addEmail', async (email) => {
  try {
    const response = await axios.post('/api/profile/add-email', { email });
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});

const deleteEmail = createAsyncThunk('emails/deleteEmail', async (emailToDelete) => {
  try {
    const response = await axios.delete('/api/profile/delete-email', { data: { emailToDelete } });
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});

const multiDeleteEmails = createAsyncThunk('emails/multiDeleteEmails', async (emailsToDelete) => {
  try {
    const response = await axios.delete('/api/profile/multi-delete-emails', { data: { emailsToDelete } });
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});

export { fetchEmails, addEmail, deleteEmail, multiDeleteEmails }