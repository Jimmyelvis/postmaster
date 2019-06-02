// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import SurveyTextarea from "./SurveyTextarea";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {

    return _.map(formFields, ({ label, name, rows }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          Type="text"
          label={label}
          name={name}
          rows={rows}
        />
      );
    });

    
  }

  render() {
    return (
      <div>
        <h2>Create Your Survey</h2>

        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <Link to="/dashboard" className="btn btn-cancel">
                Cancel
                {/* <i className="material-icons right">cancel</i> */}
              </Link>

              <button type="submit" className="btn btn-next">
                Next
                {/* <i className="material-icons right">done</i> */}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  // _.each(formFields, ({ name, label }) => {
  //   if (!values[name]) {
  //     errors[name] = `you must provide a ${label.toLowerCase()}`;
  //   }
  // });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
