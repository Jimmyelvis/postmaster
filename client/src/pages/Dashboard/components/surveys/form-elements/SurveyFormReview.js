import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Updated import for React Router 6
import formFields from './formFields';


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

  // useEffect(() => {
  //   if (errors) {
  //     setErrors(errors);

  //     setTimeout(() => {
  //       dispatch(clearErrors()); // Dispatch the clearErrors action
  //     }, 3000);
  //   }
  // }, [errors, dispatch]);

 



  return (
    <React.Fragment>
      <h3 className="heading-3 mb-md">Please confirm your entries</h3>

      <h3 className="heading-3 mb-md">{
        title
      }</h3>

      <h3 className="heading-3 mb-md">{
        subject
      }</h3>

      <h3 className="heading-3 mb-md">{
        body
      }</h3>

      <h3 className="heading-3 mb-md">{
        recipients
      }</h3>
      


      

      <div className="errormsg">
        <h2>{errors.msg}</h2>
      </div>

      {/* {reviewFields} */}

      <div className="submitButtons">
        <button className="btn btn-cancel" onClick={(e) => {
          e.preventDefault();
          onCancel();
          }}>
          Back
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("Survey Results:", values);

            // dispatch(submitSurvey(values, navigate));

            // onSurveySubmit(e);
            // navigate('/surveys');
          } }
          className="btn btn-next"
        >
          Send Survey
        </button>
      </div>
    </React.Fragment>
  );
};

export default SurveyFormReview;
