import { createSlice, current } from '@reduxjs/toolkit';
import { fetchSurveys, fetchSurvey } from '../thunks/fetchSurveys';

const initialState = {
  surveyList: [],
  survey: {},
  loading: false,
  title: '',
  subject: '',
  body: '',
  recipients: '',
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
  }
});


export const surveysReducer = surveysSlice.reducer;

export const { getFormValues, clearFormValues } = surveysSlice.actions;


