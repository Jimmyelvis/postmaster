import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formFields from './formFields';

import { createSlice, configureStore } from '@reduxjs/toolkit';

// Define Redux slice and reducer using Redux Toolkit
const initialState = {
  formValues: {},
  errors: {},
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: state => {
      state.errors = {};
    },
  },
});

const { setFormValues, setErrors, clearErrors } = surveySlice.actions;

// Create Redux store using Redux Toolkit
const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
  },
});

const SurveyFormReview = () => {
  const [errors, setErrors] = useState({});
  const formValues = useSelector(state => state.survey.formValues);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace withRouter with useNavigate

  useEffect(() => {
    if (errors) {
      setErrors(errors);

      setTimeout(() => {
        dispatch(clearErrors()); // Dispatch the clearErrors action
      }, 3000);
    }
  }, [errors, dispatch]);

  const reviewFields = formFields.map(({ name, label }) => (
    <div className="labelgroup" key={name}>
      <label>{label}</label>
      <div className="formValues">{formValues[name]}</div>
    </div>
  ));

  return (
    <React.Fragment>
      <h3 className="heading-3 mb-md">Please confirm your entries</h3>

      <div className="errormsg">
        <h2>{errors.msg}</h2>
      </div>

      {reviewFields}

      <div className="submitButtons">
        <button className="btn btn-cancel" onClick={() => navigate(-1)}>
          Back
        </button>

        {/* <button
          onClick={() => dispatch(submitSurvey(formValues, navigate))}
          className="btn btn-next"
        >
          Send Survey
        </button> */}
      </div>
    </React.Fragment>
  );
};

export default SurveyFormReview;

