import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Panel } from 'components/ui/Layout/Panel';
import SurveyIcon from "assets/images/survey-icon.svg";
import SortableTable from 'components/ui/Table/SortableTable';
import DeleteBtn from 'assets/images/btn-delete.svg';
import EditBtn from 'assets/images/btn-edit.svg';
import AddBtn from 'assets/images/btn-new.svg';
import CheckMark from 'assets/images/checkmark.svg';
import Cancel from 'assets/images/cancel.svg';
import { getFormattedDate } from 'utils/formatDate';
import { faker } from '@faker-js/faker';
import { Avatar } from 'pages/Dashboard/components/Avatar';
import { fetchEmails, editEmail, deleteEmail, multiDeleteEmails } from 'ReduxStore';


export const Email_List = () => {
  const [list, setList] = useState([])
  const [edit, setedit] = useState(false)
  const [activeEmail, setActiveEmail] = useState("")


  const [editingEmail, setEditingEmail] = useState(null); // Holds the original email being edited

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

  const editemail = (oldEmail, newEmail) => {
    dispatch(editEmail({
      oldEmail,
      newEmail
    }));
  }

  const deleteemail = (emailToDelete) => {

    if (checkedEmails.length > 1) {
      dispatch(multiDeleteEmails(checkedEmails));
    } else {
      dispatch(deleteEmail(emailToDelete));
    }
  }


  const handleEmailChange = (e) => {
    setActiveEmail(e.target.value); // Update the activeEmail for the input field
  };

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
  
 /*
    This function will be called when the select all checkbox is checked or unchecked. It will update the checkedEmails state variable. If all emails are already in the checkedEmails array, then remove all emails. If all emails are not in the checkedEmails array, then add all emails.
 */
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
              {email === editingEmail && edit ? (
                // Render an input field when in edit mode
                <h3 
                  className={`heading-3 ${email === editingEmail ? 'edit-bg' : ''}`}>
                   <input 
                      type="text"
                      value={activeEmail}
                      onChange={(e) => handleEmailChange(e, email)}
                      className="editable-input heading-3"
                    />
                </h3>
              ) : (
                // Render the h3 element when not in edit mode
                <h3 className={`heading-3 ${email === editingEmail ? 'edit-bg' : ''}`}>
                  {email}
                </h3>
              )}

              {email === editingEmail && (
                <div className="checkmark-cancel">
                  <img src={CheckMark} alt="" 
                    className='icon icon-checkmark'
                    onClick={() => {
                      console.log({
                        "current email": email,
                        "new email": activeEmail,
                      }); 
                      editemail(email, activeEmail)
                      setedit(false)
                      setEditingEmail("")
                    }}
                  />
                  <img 
                    src={Cancel} alt="" 
                    className='icon icon-cancel' 
                    onClick={() => {
                      setedit(false)
                      setEditingEmail("")
                    }}
                  />
                </div>
              )}
          </div>
        ),
        sortValue: (email) => email,
      },
      {
        label: 'Edit',
        render: (email) => (
          <img src={EditBtn} 
            alt="" 
            className='icon icon-edit'
            onClick={() => {
              console.log({
                email: email,
              })
              setedit(true)
              setEditingEmail(email)
              setActiveEmail(email)
            }} 
          />
        ),
      },
      {
        label: 'Delete',
        render: (email) => (
          <img 
            src={DeleteBtn} alt="" 
            className='icon icon-delete'
            onClick={() => {
              deleteemail(email);
            }}
          />
        ),
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
        <div className="icon-heading">
          <img src={SurveyIcon} alt="" className="icon survey-list-icon" />
          <h2 className="heading-2 mb-md">Email List</h2>
        </div>

        <p>These are your saved emails. Click on the plus sign to add more</p>

        <h3 className="heading-3 total-emails">
          Total Emails:
          <span className="total-emails-number">
          {emails.length}
          </span> 
        </h3>

        {checkedEmails.length > 0 ? (
          <h3 className="heading-3 checked-emails">
            Emails Selected:
            <span className="checked-emails-number">
              {checkedEmails.length}
            </span> 
          </h3>
        ) : (
          ""
        )}

        {checkedEmails.length === emails.length && emails.length > 0 ? (
          <h3 className="heading-3 delete-all-button" onClick={() => deleteemail()}>
            Delete All
          </h3>
        ) : (
          ""
        )}
      </div>

      <div className="email-list__emails">{renderEmails()}</div>

      <img src={AddBtn} alt="" className="icon icon-add" />
    </Panel>
  );
}
