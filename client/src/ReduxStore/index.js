import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { surveysReducer } from './slices/surveysSlice';


// import surveysReducer from './slices/surveysSlice';
// import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveysReducer,
  },
});

export * from './thunks/getUser';
export * from './thunks/fetchSurveys';
