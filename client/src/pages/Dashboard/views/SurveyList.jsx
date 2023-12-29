import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Panel } from 'components/ui/Layout/Panel';
import { dashBoardPath } from 'pages/Dashboard/utils/constants';
import Payments from '../components/Payments';
import { fetchSurveys, deleteSurvey } from 'ReduxStore';
import asc from 'images/arrow-up.svg';
import desc from 'images/arrow-down.svg';
import SurveyIcon from "assets/images/survey-icon.svg";
import SortableTable from 'components/ui/Table/SortableTable';
import { getFormattedDate } from 'utils/formatDate';


export const SurveyList = () => {
  const [isSortedAscTitle, setIsSortedAscTitle] = useState(false);
  const [isSortedAscDate, setIsSortedAscDate] = useState(false);
  const [list, setList] = useState([])
  const [sortOrder, setsortOrder] = useState("desc")

  const { auth, surveys } = useSelector((store) => ({
    auth: store.auth,
    surveys: store.surveys.surveyList,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSurveys());
   
  }, []);

  useEffect(() => {
    if (surveys) {
      let surveyList = [...surveys]
      setList(surveyList)
    }
  
  }, [dispatch, surveys]);



  const sortTitle = (e) => {
    e.preventDefault();

    console.log("sortOrder", sortOrder);

    if (sortOrder === "desc") {
      setList(list.sort((a, b) => a.title.localeCompare(b.title)))
      setsortOrder("asc")
    } else {
      setList(list.sort((a, b) => b.title.localeCompare(a.title)))
      setsortOrder("desc")
    }

  };

  const sortDate = (e) => {
    e.preventDefault();

    if (sortOrder === "desc") {
      setList(list.sort((a, b ) => new Date(a.dateSent) - new Date(b.dateSent)))
      setsortOrder("asc")
    } else {
      setList(list.sort((a, b ) => new Date(b.dateSent) - new Date(a.dateSent)))
      setsortOrder("desc")
    }
  };

  const getSort = () => { 
    return (a, b) => new Date(b.dateSent) - new Date(a.dateSent)
   }

  const renderSurveys = () => {

    const config = [
      {
        mobile_label: 'Title',
        label: 'Title',
        render: (surveyrecord) => surveyrecord.title,
        sortValue: (surveyrecord) => surveyrecord.title,
      },
      {
        mobile_label: 'Date Sent',
        label: 'Date Sent',
        render: (surveyrecord) => getFormattedDate(surveyrecord.dateSent),
        sortValue: (surveyrecord) => surveyrecord.dateSent,
      },
      {
        // mobile_label: 'Details',
        label: 'Details',
        render: (surveyrecord) => (
          <button className="btn btn--primary">
            <Link to={`${dashBoardPath}/surveydetail/${surveyrecord._id}`}>Details</Link>
          </button>
        ),
      },
      {
        // mobile_label: 'Delete',
        label: 'Delete',
        render: (surveyrecord) => (
          <a
            href="#"
            onClick={() => dispatch(deleteSurvey(surveyrecord._id))}
            className="right"
          >
            <i className="fas fa-trash"></i>
          </a>
        ),
      },
    ];
  
    const keyFn = (surveyrecord) => {
      return surveyrecord.name;
    };

    if (list && list.length) {

      return (
        <SortableTable
          data={list}
          config={config}
          keyFn={keyFn}
        />
      )
    }

  };



  return (
    
      <Panel className="panel-dashboard survey-list">

          <div className="survey-list__heading mb-lg">

            <div className="icon-heading">
              <img src={SurveyIcon} alt="" className='icon survey-list-icon' />
              <h2 className="heading-2 mb-md">Your Surveys</h2>
            </div>

            <p>
              These are your surveys that you have sent out. Starting from the
              most recent one.
            </p>

          </div>


          <div className="survey-list__surveys">

            {renderSurveys()}
          </div>
         
        
      </Panel>
    
  );
};


