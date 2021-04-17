// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {

    return (
      <div  className="labelgroup" key={name}>
        <label>{label}</label>
        <div className="formValues">
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <h3 className="heading-3 mb-md">Please confirm your entries</h3>

      {reviewFields}

      <div className="submitButtons">
        <button className="btn btn-cancel" onClick={onCancel}>
          Back
        </button>

        <button
          onClick={() => submitSurvey(formValues, history)}
          className="btn btn-next"
        >
          Send Survey
        </button>
      </div>
    </React.Fragment>
  );

};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
