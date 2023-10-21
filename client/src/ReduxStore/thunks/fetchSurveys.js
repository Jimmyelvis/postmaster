import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchSurveys = createAsyncThunk('surveys/fetchSurveys', async () => {
  try {
    const response = await axios.get('/api/surveys');
    return response.data;
  } 
  
  catch (error) {
    console.error(error);
  }
});

const fetchSurvey = createAsyncThunk('surveys/fetchSurvey', async (surveyId) => {
  try {
    const response = await axios.get(`/api/surveys/${surveyId}`);
    return response.data;
  }

  catch (error) {
    console.error(error);
  }
});


export { fetchSurveys, fetchSurvey }