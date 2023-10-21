import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import SurveyTextarea from './SurveyTextarea';
import { invalidEmails } from 'utils/validateEmails';
import { getFormValues, clearFormValues } from 'ReduxStore/slices/surveysSlice';


/*
  todo: We most likely need to cut the useState and it's value from Surveynew.js and paste it here. And then see if we can set the values in useSate to the values in the redux store.
*/


const SurveyForm = ({ review }) => {
  const { auth } = useSelector((state) => state.auth);

  const state = useSelector((state) => state);
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    title : `${state.surveys.title}`,
    subject: `${state.surveys.subject}`,
    body: `${state.surveys.body}`,
    recipients: `${state.surveys.recipients}`,
  });

  const {
    title,
    company,
    subject,
    body,
    recipients,
  } = values;

  const [errors, setErrors ] = useState({
    title: '',
    subject: '',
    body: '',
    recipients: '',
  })
  

  const onChange = (e) => {
     setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSurveySubmit = (e) => { 
    e.preventDefault();

    validate(values);
  
   }

   const clearForm = (e) => { 

    console.log('clearForm');

      e.preventDefault();
      setValues({
        title : '',
        subject: '',
        body: '',
        recipients: '',
      });

      dispatch(clearFormValues());

      setErrors({
        title: '',
        subject: '',
        body: '',
        recipients: '',
      });
    }


    const validate = (values) => {
      let newErrors = {}; // Create a new errors object
    
      if (!values.title) {
        newErrors.title = 'You need a title';
      }
    
      if (!values.subject) {
        newErrors.subject = 'You need a subject for your survey';
      }
    
      if (!values.body) {
        newErrors.body = 'You\'re going to need some text for your email';
      }
    
      if (!values.recipients) {
        newErrors.recipients = 'You\'re going to need some recipients to send your email to';
      }


      if (values.recipients) {

        const checkedEmails = invalidEmails(values.recipients);

        console.log('checkedEmails', checkedEmails);

        if (checkedEmails.length) {
          newErrors.recipients = invalidEmails(values.recipients);
        } else {
          newErrors.recipients = '';

          if (!newErrors.title && !newErrors.subject && !newErrors.body ) {
            newErrors = {};

            review();
            dispatch(getFormValues(values));
          }
        }
        
      }
    
      // Update errors state with the newErrors object
      setErrors(newErrors);
    
      // // Clear errors after a delay (if needed)
      // setTimeout(() => {
      //   setErrors({
      //     title : '',
      //     subject: '',
      //     body: '',
      //     recipients: '',
      //     inValid: [],
      //   });
      // }, 3000);
    };
    
    
  

  const renderFields = () => (
    <div className="surveyfields">

        <TextFieldGroup
          label="Survey Title"
          type="text"
          name="title"
          placeholder="Enter A Title For Your Survey"
          onChange={onChange}
          value={title || state.surveys.title}
          required
        />
        
        <h3>
          { errors.title && errors.title}
        </h3>

        <TextFieldGroup
          label="Subject"
          type="text"
          name="subject"
          placeholder="Enter a subject for your survey"
          onChange={onChange}
          value={subject  || state.surveys.subject}
          required
        />

      <h3>
          { errors.subject && errors.subject}
        </h3>

        <TextAreaFieldGroup
          label="Email Body"
          type="textarea"
          name="body"
          placeholder="Enter some text that describes your survey"
          onChange={onChange}
          value={body  || state.surveys.body}
          required
        />

      <h3>
          { errors.body && errors.body}
        </h3>
     
        <TextAreaFieldGroup
          label="Recipient List"
          type="textarea"
          name="recipients"
          placeholder="Enter a list of recipients that will receive your survey. Separate your emails by using a comma"
          onChange={onChange}
          value={recipients  || state.surveys.recipients}
          required
        />

      <h3>
          { errors.recipients && errors.recipients}
        </h3>

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

          <button
            className='btn btn-next'
            onClick={(e) => clearForm(e)}
          >
            Reset
          </button>

          <button 
              className="btn btn-next"
              onClick={(e) => onSurveySubmit(e)}
          >
            Next
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};


export default SurveyForm;
