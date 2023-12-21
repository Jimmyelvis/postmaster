import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from './getUser';
import axios from 'axios';


const submitSurvey = createAsyncThunk('surveys/submitSurvey', 
async ({ values, navigate }, { dispatch }) => {



  try {
    const response = await axios.post(`/api/surveys`, values);
    // history.push('/dashboard');


   
    /*
      Dispatch the fetchUser thunk, which will make a request to the server
      to get the current user, and then update the store with the current users
      information. Such as the users credits.
    */
    dispatch(fetchUser());
    navigate('/dashboard/surveylist');

    return response.data;
  } 
  
  catch (error) {
    console.error('Error', error);
  }


});


export { submitSurvey }

