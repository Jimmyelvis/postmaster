import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SiteHeader from '../../pages/Dashboard/components/dashheader';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import Payments from '../../pages/Dashboard/components/Payments';

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  const { auth, surveys } = useSelector((state) => ({
    auth: state.auth,
    surveys: state.surveys,
  }));

  const renderContent = () => {
    if (showFormReview) {
      return (
        <SurveyFormReview onCancel={() => setShowFormReview(false)} />
      );
    }

    return (
      <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
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
      <SiteHeader />
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

export default SurveyNew;

