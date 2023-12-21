import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Panel } from "components/ui/Layout/Panel";
import { dashBoardPath } from "pages/Dashboard/utils/constants";
import SurveyForm from "../components/surveys/form-elements/SurveyForm";
import SurveyFormReview from "../components/surveys/form-elements/SurveyFormReview";
import SurveyIcon from "assets/images/survey-icon.svg";
import Payments from "../components/Payments";

export const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  const { auth, surveys } = useSelector((state) => ({
    auth: state.auth,
    surveys: state.surveys,
  }));

  const renderContent = () => {
    if (showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => {
            setShowFormReview(false);
          }}
        />
      );
    }

    return <SurveyForm review={() => setShowFormReview(true)} />;
  };

  const getHeading = () => {
    
    if (showFormReview) {
      return (
        <>
          <div className="icon-heading">
            <img src={SurveyIcon} alt="" className="icon survey-list-icon" />
            <h2 className="heading-2 mb-md">Survey Review</h2>
          </div>
          <p>Review your entries and make sure everything is correct</p>
        </>
      );
    } else {
      return (
        <>
          <div className="icon-heading">
            <img src={SurveyIcon} alt="" className="icon survey-list-icon" />
            <h2 className="heading-2 mb-md">Survey Creation</h2>
          </div>

          <p>Create A New Survey to send to your customers</p>
        </>
      );
    }
  }

  return (
    <Panel className="panel-dashboard survey-creation">
      <div className="survey-list__heading mb-lg">
        {getHeading()}
      </div>

      {renderContent()}
    </Panel>
  );
};
