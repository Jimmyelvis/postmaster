import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SurveyForm from '../components/surveys/form-elements/SurveyForm';
import SurveyFormReview from '../components/surveys/form-elements/SurveyFormReview';
import Payments from '../components/Payments';

export const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);


  const { auth, surveys } = useSelector((state) => ({
    auth: state.auth,
    surveys: state.surveys,
  }));



  const renderContent = () => {
    if (showFormReview) {
      return (
        <SurveyFormReview onCancel={() => {
          setShowFormReview(false)
        }} />
      );
    }

    return (
      <SurveyForm 
          review={() => setShowFormReview(true)} 
      />
    );
  };

  let sideContent;

  if (auth === null) {
    sideContent = 'loading......';
  } else {
    sideContent = (
      <React.Fragment>
        <div className="newsurvey-btn mb-md">
          <span>
            <Link to="/surveys/new">
              <h3>New Survey</h3>
            </Link>
          </span>
        </div>

        <Payments />
      </React.Fragment>
    );
  }



  return (
    <div>
      <div className="dashboard">
        <div className="dashInfo">
          <div className="sidebar">{sideContent}</div>
          <div className="mainarea">
            <div className="mainarea__heading mb-lg">
              <h2 className="heading-2 mb-md">Create Your Survey</h2>
            </div>
            <div className="survey">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

