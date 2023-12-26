import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Panel } from "components/ui/Layout/Panel";
import SurveyIcon from "assets/images/survey-icon.svg";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { addEmail } from "ReduxStore";

export const AddEmails = () => {

  const [newEmail, setEmail] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setEmail(e.target.value);
 };

 const submitEmail = () => { 
   dispatch(addEmail(newEmail));
  }

  return (
    <Panel className="add-mails-wrapper">
      <div className="email-list__heading mb-lg">
        <div className="icon-heading">
          <img src={SurveyIcon} alt="" className="icon survey-list-icon" />
          <h2 className="heading-2 mb-md">Add New Email</h2>
        </div>

        <p>Add a single or multiple emails. </p>
      </div>


      <form>

        <TextFieldGroup
            label="Survey Title"
            type="text"
            name="title"
            placeholder="Enter A Title For Your Survey"
            onChange={onChange}
            value={newEmail}
            required
          />

          <button 
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                console.log('====================================');
                console.log('email', newEmail);
                console.log('====================================');
                submitEmail();
              }}
          >
            Next
          </button>
      </form>


    </Panel>
  );
};
