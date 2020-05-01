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

    // return _.map(formFields, ({ label, name, rows }) => {
    //   return (
    //     <Field
    //       key={name}
    //       component={SurveyField}
    //       Type="text"
    //       label={label}
    //       name={name}
    //       rows={rows}
    //     />
    //   );
    // });

    return (
      <div className="surveyfields">

        <div className="surveyfield">
          <Field
            label="Survey Title"
            Type="text"
            name="title"
            placeholder="Enter A Title For Your Survey"
            component={SurveyField}
          />
        </div>

        <div className="surveyfield">
          <Field
            label="Company Email"
            Type="text"
            name="company"
            placeholder="Enter your company address in the form of no-reply@your-company.com"
            component={SurveyField}
          />
        </div>

        <div className="surveyfield">
          <Field
            label="Subject"
            Type="text"
            name="subject"
            placeholder="Enter a subject for your survey"
            component={SurveyField}
          />
        </div>

        <div className="surveyfield">
          <Field
            label="Email Body"
            Type="textarea"
            name="body"
            placeholder="Enter some text that describes your survey"
            component={SurveyTextarea}
          />
        </div>

        <div className="surveyfield">
          <Field
            label="Recipient List"
            Type="textarea"
            name="recipients"
            placeholder="Enter a list of recipients that will receive your
            survey. Separate your emails by using a comma"
            component={SurveyTextarea}
          />
        </div>

      </div>
    );



    
  }

  render() {
    return (
      <React.Fragment>

        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

         
            <div className="submitButtons">
              <Link to="/dashboard" className="btn btn-cancel">
                Cancel
              </Link>

              <button type="submit" className="btn btn-next">
                Next
              </button>
            </div>
          
        </form>
      </React.Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  errors.company = validateEmails(values.company || "");


  if (!values.title) {
    errors.title = "You need a title";
  }

  if (!values.company) {
    errors.company = "You need to enter your companies email";
  }

  if (!values.subject) {
    errors.subject = "You need a subject for your survey";
  }

  if (!values.body) {
    errors.body = "You're going to need some text for your email";
  }

  if (!values.recipients) {
    errors.recipients = "You going to need some recipients to send your email to";
  }



  // _.each(formFields, ({ name, noValueError }) => {
  //   if (!values[name]) {
  //     errors[name] = noValueError;
  //   }
  // });

  // _.each(formFields, ({ name, label }) => {
  //   if (!values[name]) {
  //     errors[name] = `you must provide a ${label.toLowerCase()}`;
  //   }
  // });

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
