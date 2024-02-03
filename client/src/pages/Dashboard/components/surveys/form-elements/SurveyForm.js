import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TextFieldGroup from './TextFieldGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import SurveyTextarea from './SurveyTextarea';
import { invalidEmails } from 'utils/validateEmails';
import { getFormValues, clearFormValues } from 'ReduxStore/slices/surveysSlice';
import { openModal, closeModal, setOrigin } from "ReduxStore/slices/dashboardUISlice";
import Modal from "components/ui/Modal";
import { EmailList } from 'pages/Dashboard/views/SurveyNew/components/EmailList';




const SurveyForm = ({ review }) => {
  const { auth } = useSelector((state) => state.auth);

  const state = useSelector((state) => state);
  const dispatch = useDispatch()

  // const [values, setValues] = useState({
  //   title : `${state.surveys.title}`,
  //   subject: `${state.surveys.subject}`,
  //   body: `${state.surveys.body}`,
  //   recipients: `${state.surveys.recipients}`,
  // });


    /*
  Testing only
  */

  let currentTime = new Date();

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let seconds = currentTime.getSeconds();
let milliseconds = currentTime.getMilliseconds();

let formattedTime =  seconds.toString().padStart(2, '0') + '.' + 
                    milliseconds.toString().padStart(3, '0');


  const [values, setValues] = useState({
    title : `${formattedTime} Brand New test 2024`,
    subject: `${formattedTime} Testing 2024`,
    body: `I'm baby street art humblebrag bicycle rights yuccie, kombucha af hella occupy pinterest kale chips bushwick. Retro la croix keffiyeh etsy DSA. Man bun raw denim quinoa meditation, waistcoat schlitz disrupt shaman. Echo park drinking vinegar paleo aesthetic, street art cred letterpress 90's hammock live-edge mixtape vinyl ethical affogato scenester. Poke flannel williamsburg bodega boys celiac pork belly locavore semiotics. Wayfarers gentrify chartreuse crucifix tote bag small batch raw denim cornhole ennui.

    Sus gatekeep cardigan roof party skateboard microdosing messenger bag health goth leggings. Ennui swag authentic, fashion axe iceland vice mumblecore. Ugh brunch selvage hexagon raw denim swag. Put a bird on it gatekeep activated charcoal shoreditch occupy cornhole. Succulents wayfarers keffiyeh austin gorpcore etsy gluten-free letterpress pour-over franzen hot chicken hella.`,
    recipients: `dylancougar@yahoo.com,jinjoe@zoho.com,jinjoeweb@gmail.com,jinjoelife@gmail.com`,
  });

  /* testing only */

  const [addedEmails, setAddedEmails] = useState([]);

    /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
    const [modalTarget, setModalTarget] = useState(null);


    /*
      This will be used to determine what component called the modal
      this will be passed as a prop to the modal component, and the 
      modal context 
    */
    const [compOrigin, setCompOrigin] = useState(null);

    /**
     * Check what is the target state, then determine
     * what component should be rendered in the modal.
     * Useful for when a file may have multiple components
     * that can call the modal
     */
    const checkTarget = () => {
      return (
        <EmailList
          setAddedEmails={setAddedEmails}
        />
      );
    };

    useEffect(() => {

      if (addedEmails?.length > 0) {

        // let newEmails = addedEmails.map(email => `${email}`).join(',');

        setValues({
        ...values,
          recipients: `${[...state.surveys.recipients, addedEmails.join(',')] }`,
        })

      }

    }, [addedEmails])
    




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
    <>

        <TextFieldGroup
          label="Survey Title"
          type="text"
          name="title"
          placeholder="Enter A Title For Your Survey"
          onChange={onChange}
          value={title || state.surveys.title}
          required
          error={errors.title && errors.title}
        />
        

        <TextFieldGroup
          label="Subject"
          type="text"
          name="subject"
          placeholder="Enter a subject for your survey"
          onChange={onChange}
          value={subject  || state.surveys.subject}
          error={errors.subject && errors.subject}
          required
        />


        <TextAreaFieldGroup
          label="Email Body"
          type="textarea"
          name="body"
          placeholder="Enter some text that describes your survey"
          onChange={onChange}
          value={body  || state.surveys.body}
          error={errors.body && errors.body}
          required
        />

        <TextAreaFieldGroup
          label="Recipient List"
          type="textarea"
          name="recipients"
          placeholder="Enter a list of recipients that will receive your survey. Separate your emails by using a comma"
          onChange={onChange}
          value={recipients  || state.surveys.recipients}
          error={errors.recipients && errors.recipients}
          required
        />

      </>
  );

  return (
    <React.Fragment>
      <form>
        {renderFields()}
        <button 
            className="btn btn--primary btn-open-list"
            onClick={(e) => {
              e.preventDefault();
              const origin = "open email list";
              setModalTarget("email list modal");
              setCompOrigin(origin);
              dispatch(openModal(origin));
            }}
        >
          Open Email List
        </button>
        <div className="submitButtons">
          <Link to="/dashboard" className="btn btn--danger">
            Cancel
          </Link>

          <button
            className='btn btn--danger'
            onClick={(e) => clearForm(e)}
          >
            Reset
          </button>

          <button 
              className="btn btn--primary"
              onClick={(e) => onSurveySubmit(e)}
          >
            Next
          </button>
        </div>
      </form>

      <Modal
        selector={"#modal"}
        modalTarget={modalTarget}
        modalOrigin={compOrigin}
      >
        {checkTarget()}
      </Modal>
    </React.Fragment>
  );
};


export default SurveyForm;
