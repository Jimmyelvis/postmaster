import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router 6
import formFields from './formFields';
import { submitSurvey, clearErrors } from 'ReduxStore';


const SurveyFormReview = ({ onCancel }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace withRouter with useNavigate

  const state = useSelector((state) => state);

  const { title, company, subject, body, recipients } = state.surveys;

  const [values, setValues] = useState({
    title : `${state.surveys.title}`,
    subject: `${state.surveys.subject}`,
    body: `${state.surveys.body}`,
    recipients: `${state.surveys.recipients}`,
  });

  const handleSurveySubmit = (surveyData) => {

    /**
     * The thunk will need the object with both the values and the 
     * navigate function. So we can navigate to the surveylist page
     */
    dispatch(submitSurvey({ values: surveyData, navigate }));
  };
  


  return (
    <div className='form-review'>
      
      <div className="review-fields">

        <h3 className="heading-3 review-field mb-md">
         Title:  <span className="value">{title }</span>
        </h3>

        <h3 className="heading-3 review-field mb-md">
          Subject: <span className="value">{ subject }</span>
        </h3>

        <h3 className="heading-3 review-field mb-md">
          Body: <span className="value">{body }</span>
        </h3>

        <h3 className="heading-3 review-field mb-md">
          Recipients: <span className="value">{ recipients }</span>
        </h3>
        
      </div>

      <div className="submitButtons">
        <button className="btn btn--danger" onClick={(e) => {
          e.preventDefault();
          onCancel();
          }}>
          Back
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("Survey Results:", values);
            handleSurveySubmit(values);

            // dispatch(submitSurvey(values));


            // onSurveySubmit(e);
            // navigate('/surveys');
          } }
          className="btn btn--primary"
        >
          Send Survey
        </button>
      </div>

    </div>
  );
};

export default SurveyFormReview;
