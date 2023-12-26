import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlertWithTimeout } from './setAlertWithTimeout';

const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  try {
    const response = await axios.get('/api/profile/emails');
    return response.data;
  } 
  
  catch (error) {
    console.error(error);
  }
});

const addEmail = createAsyncThunk('emails/addEmail', async (newEmail, { dispatch }) => {


  try {
    const response = await axios.patch('/api/profile/email', { newEmail });
    dispatch(setAlertWithTimeout({ msg: 'Email Added', alertType: 'success' }));
    return response.data;
  }

  catch (error) {
    console.error(error);

     // Extracting the message from the server response
     const errorMessage = error.response && error.response.data ? error.response.data : 'An unexpected error occurred';
  
     dispatch(setAlertWithTimeout({ msg: errorMessage, alertType: 'danger' }));

     return rejectWithValue(error.response.data);
   
  }
});



const editEmail = createAsyncThunk('emails/editEmail', async ({
  oldEmail,
  newEmail,
},  { dispatch }) => {


  const values = {
    oldEmail,
    newEmail,
  };

  try {
    const response = await axios.patch('/api/profile/edit-email', 
    values);

    dispatch(setAlertWithTimeout({ msg: 'Email Updated', alertType: 'success' }));

    return response.data;
  }

  catch (error) {
    console.error(error);
  
    // Extracting the message from the server response
    const errorMessage = error.response && error.response.data ? error.response.data : 'An unexpected error occurred';
  
    dispatch(setAlertWithTimeout({ msg: errorMessage, alertType: 'danger' }));

    return rejectWithValue(error.response.data);
  }
  
});


const deleteEmail = createAsyncThunk('emails/deleteEmail', async (emailToDelete, { dispatch }) => {

 const values = {
    emailToDelete,
  };

  console.log('values', values);


  try {
    const response = await axios.delete('/api/profile/delete-email', { data: values });

    dispatch(setAlertWithTimeout({ msg: 'Email Deleted', alertType: 'success' }));

    return response.data;
  }


  catch (error) {
    console.error(error);

    // Extracting the message from the server response
    const errorMessage = error.response && error.response.data ? error.response.data : 'An unexpected error occurred';
  
    dispatch(setAlertWithTimeout({ msg: errorMessage, alertType: 'danger' }));
  }
});

const multiDeleteEmails = createAsyncThunk('emails/multiDeleteEmails', async (emailsToDelete, {
  dispatch,
}) => {
  try {
    const response = await axios.delete('/api/profile/multi-delete-emails', { data: { emailsToDelete } });

    dispatch(setAlertWithTimeout({ msg: 'Emails Deleted', alertType: 'success' }));

    return response.data;
  }

  catch (error) {
    console.error(error);

    // Extracting the message from the server response
    const errorMessage = error.response && error.response.data ? error.response.data : 'An unexpected error occurred';
  
    dispatch(setAlertWithTimeout({ msg: errorMessage, alertType: 'danger' }));
  }
});

export { fetchEmails, addEmail, editEmail, deleteEmail, multiDeleteEmails }