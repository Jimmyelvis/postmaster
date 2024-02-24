import { createSlice, current } from '@reduxjs/toolkit';
import { fetchSurveys, fetchSurvey } from '../thunks/fetchSurveys';
import { submitSurvey } from '../thunks/createSurvey';
import { deleteSurvey } from '../thunks/deleteSurvey';
import { searchSurveys } from '../thunks/searchSurveys';

const initialState = {
  surveyList: [],
  searchResults: [],
  survey: {},
  loading: false,
  title: '',
  subject: '',
  body: '',
  recipients: '',
  error: '',
};

const surveysSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    getFormValues: (state, action) => {
      state.title = action.payload.title;
      state.subject = action.payload.subject;
      state.body = action.payload.body;
      state.recipients = action.payload.recipients;
    },
    clearFormValues: (state, action) => {
      state.title = '';
      state.subject = '';
      state.body = '';
      state.recipients = '';
    },
    editFormValues: (state, action) => {
      state.title = action.payload.title;
      state.subject = action.payload.subject;
      state.body = action.payload.body;
      state.recipients = action.payload.recipients;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchSurveys.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchSurveys.fulfilled, (state, action) => {
      state.surveyList = action.payload;
    })
    .addCase(fetchSurveys.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(fetchSurvey.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchSurvey.fulfilled, (state, action) => {
      state.survey = action.payload;
    })
    .addCase(fetchSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(submitSurvey.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(submitSurvey.fulfilled, (state, action) => {
      state.surveyList = [...state.surveyList, action.payload];
    })
    .addCase(submitSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(deleteSurvey.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(deleteSurvey.fulfilled, (state, action) => {
      state.surveyList = state.surveyList.filter((survey) => survey._id !== action.payload);
    })
    .addCase(deleteSurvey.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })
    .addCase(searchSurveys.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(searchSurveys.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    })
    .addCase(searchSurveys.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    })  
  }
});


export const surveysReducer = surveysSlice.reducer;

export const { getFormValues, clearFormValues, editFormValues } = surveysSlice.actions;


