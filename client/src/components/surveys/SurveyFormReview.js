// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


export class SurveyFormReview extends Component {
  constructor() {
    super();

    this.state = {
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

      setTimeout(() => {
        this.setState({ errors: "" });
      }, 3000);
    }
  }

  render() {

    // const { errors } = this.state;


    const { onCancel, formValues, submitSurvey, history, errors } = this.props;

    const reviewFields = _.map(formFields, ({ name, label }) => {
      return (
        <div className="labelgroup" key={name}>
          <label>{label}</label>
          <div className="formValues">{formValues[name]}</div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <h3 className="heading-3 mb-md">Please confirm your entries</h3>

        <div className="errormsg">
          <h2>{this.state.errors.msg}</h2>
        </div>

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
  }
}


// const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

//   const reviewFields = _.map(formFields, ({ name, label }) => {

//     return (
//       <div  className="labelgroup" key={name}>
//         <label>{label}</label>
//         <div className="formValues">
//           {formValues[name]}
//         </div>
//       </div>
//     );
//   });

//   return (
//     <React.Fragment>
//       <h3 className="heading-3 mb-md">Please confirm your entries</h3>

//       {reviewFields}

//       <div className="submitButtons">
//         <button className="btn btn-cancel" onClick={onCancel}>
//           Back
//         </button>

//         <button
//           onClick={() => submitSurvey(formValues, history)}
//           className="btn btn-next"
//         >
//           Send Survey
//         </button>
//       </div>
//     </React.Fragment>
//   );

// };

// function mapStateToProps(state) {

//   console.log("==================state==================");
//   console.log(state);
//   console.log('====================================');
//   return { formValues: state.form.surveyForm.values, errors: state.errors.msg };
// }

function mapStateToProps({ form, errors}) {

  
  return { formValues: form.surveyForm.values, errors };
}


export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
