import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const searchSurveys = createAsyncThunk('surveys/searchSurveys', async (searchTerm) => {
  try {
    const response = await axios.get(`/api/getsurveys/search?term=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});


export { searchSurveys }