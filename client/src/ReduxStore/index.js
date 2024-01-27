import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { surveysReducer } from './slices/surveysSlice';
import { dashBoardUiReducer } from './slices/dashboardUISlice';
import { alertsReducer } from './slices/alertSlice';
import { emailReducer } from './slices/emailSlice';
import { profileReducer } from './slices/profileSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveysReducer,
    dashBoardUi: dashBoardUiReducer,
    alert: alertsReducer,
    emails: emailReducer,
    profile: profileReducer,
  },
});

export * from './thunks/getUser';
export * from './thunks/fetchSurveys';
export * from './thunks/createSurvey';
export * from './thunks/deleteSurvey';
export * from './thunks/setAlertWithTimeout';
export * from './thunks/searchSurveys';
export * from './thunks/emailThunk';
export * from './thunks/profileThunk';
