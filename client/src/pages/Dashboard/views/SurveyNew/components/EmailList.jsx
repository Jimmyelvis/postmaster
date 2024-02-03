import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Panel } from 'components/ui/Layout/Panel';
import SurveyIcon from "assets/images/survey-icon.svg";
import SortableTable from 'components/ui/Table/SortableTable';
import AddBtn from 'assets/images/btn-new.svg';
import { Avatar } from 'pages/Dashboard/components/Avatar';
import { fetchEmails } from "ReduxStore";
import { closeModal } from "ReduxStore/slices/dashboardUISlice";
import { SectionHeading } from "pages/Dashboard/components/SectionHeading";

export const EmailList = ({
  setAddedEmails
}) => {

  const [list, setList] = useState([])
  const [checkedEmails, setCheckedEmails] = useState([]); // State to track checked emails

  const dispatch = useDispatch();

  const { auth, emails } = useSelector((store) => ({
    auth: store.auth,
    emails: store.emails.emailList,
  }));

  useEffect(() => {
    dispatch(fetchEmails());
   
  }, []);

  useEffect(() => {
    if (emails) {
      let emailList = [...emails]
      setList(emailList)
    }
  
  }, [dispatch, emails]);

    /*
    This function will be called when a checkbox is checked or unchecked. It will update the checkedEmails state variable. If the email is already in the checkedEmails array, then remove it. If the email is not in the checkedEmails array, then add it.
  */
    const handleCheckboxChange = (email) => {
      setCheckedEmails(prev => {
        if (prev.includes(email)) {
          return prev.filter(e => e !== email); // Uncheck
        } else {
          return [...prev, email]; // Check
        }
      });
    };

    const selectAll = () => {

      /*
        Compare the length of the checkedEmails array to the length of the emails array. If they are equal, then all emails are checked. If they are not equal, then not all emails are checked.
      */
      if (checkedEmails.length === emails.length) {
        setCheckedEmails([]); // Uncheck all if all were checked
      } else {
        setCheckedEmails(emails.map(item => item)); // Check all
      }
    };

    const renderEmails = () => { 


      const config = [
        {
           label: <p className='select-all' onClick={() => selectAll()}>Select All</p>, 
          render: (email) => (
            <div className="checkbox-wrapper">
              <label class="custom-checkbox">
              <input 
                  type="checkbox" 
                  checked={checkedEmails.includes(email)}
                  onChange={() => handleCheckboxChange(email)}
                />
                <span class="checkmark"></span>
              </label>
            </div>
          )
        },
        {
          label: <p className="sort">Email</p>,
          render: (email, index) => (
            <div className="email" key={index}>
              <Avatar  email={email}  />
              <h3 className="heading-3"> {email}</h3>
            </div>
          ),
          sortValue: (email) => email,
        },
      ];
  
      const keyFn = (email) => {
        return email;
      };
  
      if (list && list.length) {
  
        return (
          <SortableTable
            config={config}
            data={list}
            keyFn={keyFn}
          />
        );
      }
  
  
     }


  return (
    <Panel className="panel-dashboard email-list">
    <div className="email-list__heading mb-lg">
      <SectionHeading
        title="Email List"
      >

      <p>These are your saved emails</p>

      <h3 className="heading-3 total-emails">
        Total Emails:
        <span className="total-emails-number">
        {emails?.length}
        </span> 
      </h3>

      {checkedEmails.length > 0 ? (
        <h3 className="heading-3 checked-emails">
          Emails Selected:
          <span className="checked-emails-number">
            {checkedEmails?.length}
          </span> 
        </h3>
      ) : (
        ""
      )}

      </SectionHeading>

    </div>

    <div className="email-list__emails">{renderEmails()}</div>

    <img 
      src={AddBtn} alt="" 
      className="icon icon-add"
      onClick={() => {
        setAddedEmails(checkedEmails)
        dispatch(closeModal())
      }}
    />

  
  </Panel>
  )
}

