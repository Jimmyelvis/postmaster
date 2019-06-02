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
     <div>
       <h2>Please confirm your entries</h2>

        {reviewFields}

       <button
         className="btn btn-back"
         onClick={onCancel}>
         Back
       </button>

       <button
         onClick={() => submitSurvey(formValues, history)}
         className="btn btn-sendSurvey"
       >
         Send Survey
       </button>

     </div>
  );

};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
