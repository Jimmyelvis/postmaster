// src/features/alerts/alertSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { setAlertWithTimeout } from '../thunks/setAlertWithTimeout';

const initialState = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      return state.filter(alert => alert.id !== action.payload);
    },
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;
export const alertsReducer = alertSlice.reducer;
