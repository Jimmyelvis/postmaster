import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSurveys } from './fetchSurveys';
import { setAlertWithTimeout } from './setAlertWithTimeout';
import axios from 'axios';

const deleteSurvey = createAsyncThunk( 'surveys/deleteSurvey',
  async (surveyId, { dispatch }) => {
    try {
      const response = await axios.delete(`/api/surveys/delete/${surveyId}`);

      dispatch(fetchSurveys());
      dispatch(setAlertWithTimeout({ msg: 'Survey Deleted', alertType: 'success' }));
      return response.data;
    } catch (error) {
      console.error('Error', error);
    }
  }
);

export { deleteSurvey };