import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlert, removeAlert } from '../slices/alertSlice';



export const setAlertWithTimeout = createAsyncThunk(
  'alert/setAlertWithTimeout',
  async ({ msg, alertType, timeout = 3000 }, { dispatch }) => {
    const id = uuidv4();

    console.log({ 
      "setAlert": setAlert,
      "removeAlert": removeAlert,
     });

    dispatch(setAlert({ msg, alertType, id }));

    setTimeout(() => {
      dispatch(removeAlert(id));
    }, timeout);
  }
);
