import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/index.js';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Only enable DevTools in development
});

export default store;