import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import SurveyTextarea from './SurveyTextarea';
import validateEmails from '../../utils/validateEmails';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const { auth } = useSelector((state) => state.auth);

  const renderFields = () => (
    <div className="surveyfields">
      <div className="surveyfield">
        <Field
          label="Survey Title"
          type="text"
          name="title"
          placeholder="Enter A Title For Your Survey"
          component={SurveyField}
        />
      </div>

      {/* <div className="surveyfield">
        <Field
          label="Company Email"
          type="text"
          name="company"
          placeholder="Enter your company address in the form of no-reply@your-company.com"
          component={SurveyField}
        />
      </div> */}

      <div className="surveyfield">
        <Field
          label="Subject"
          type="text"
          name="subject"
          placeholder="Enter a subject for your survey"
          component={SurveyField}
        />
      </div>

      <div className="surveyfield">
        <Field
          label="Email Body"
          type="textarea"
          name="body"
          placeholder="Enter some text that describes your survey"
          component={SurveyTextarea}
        />
      </div>

      <div className="surveyfield">
        <Field
          label="Recipient List"
          type="textarea"
          name="recipients"
          placeholder="Enter a list of recipients that will receive your survey. Separate your emails by using a comma"
          component={SurveyTextarea}
        />
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <form>
        {renderFields()}
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
};

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');
  errors.company = validateEmails(values.company || '');

  if (!values.title) {
    errors.title = 'You need a title';
  }

  if (!values.company) {
    errors.company = 'You need to enter your company\'s email';
  }

  if (!values.subject) {
    errors.subject = 'You need a subject for your survey';
  }

  if (!values.body) {
    errors.body = 'You\'re going to need some text for your email';
  }

  if (!values.recipients) {
    errors.recipients = 'You\'re going to need some recipients to send your email to';
  }

  return errors;
}

export default SurveyForm;
