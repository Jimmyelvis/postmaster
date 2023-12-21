import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { surveysReducer } from './slices/surveysSlice';
import { dashBoardUiReducer } from './slices/dashboardUISlice';


// import surveysReducer from './slices/surveysSlice';
// import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveysReducer,
    dashBoardUi: dashBoardUiReducer,
  },
});

export * from './thunks/getUser';
export * from './thunks/fetchSurveys';
export * from './thunks/createSurvey';
export * from './thunks/deleteSurvey';
