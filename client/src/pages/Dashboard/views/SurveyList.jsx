import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from '../components/Payments';
import { fetchSurveys } from 'ReduxStore';
import asc from 'images/arrow-up.svg';
import desc from 'images/arrow-down.svg';

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


  /*
    TODO: Figure a better way to show the sorting arrows
  */
  

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

  

     if (list && list.length) {
      return list
      .map((survey) => (
        <div className="surveyRecord" key={survey._id}>
          <li>{survey.title}</li>
          <li>{new Date(survey.dateSent).toLocaleDateString()}</li>
          <li>
            <button className="btn btn--ghostWhite">
              <Link to={`/surveydetail/${survey._id}`}>Details</Link>
            </button>
          </li>
          <li>
            <a
              href="#"
              onClick={() => dispatch(deleteSurvey(survey._id))}
              className="right"
            >
              <i className="fas fa-trash"></i>
            </a>
          </li>
        </div>
      ));
    } else {
      return (
        <React.Fragment>
          <br />
          <h3>No Surveys Found</h3>
        </React.Fragment>
      );
    }
  };

  let sideContent;

  if (auth === null) {
    sideContent = 'loading......';
  } else {
    sideContent = (
      <React.Fragment>
        <div className="newsurvey-btn mb-md">
          <span>
            <Link to="/surveys/new">
              <h3>New Survey</h3>
            </Link>
          </span>
        </div>

        <Payments />
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="dashboard">
        <div className="dashInfo">
          <div className="sidebar">{sideContent}</div>

          <div className="mainarea">
            <div className="mainarea__heading mb-lg">
              <h2 className="heading-2 mb-md">Your Surveys</h2>

              <p style={{ textAlign: 'center' }}>
                These are your surveys that you have sent out. Starting from the
                most recent one.
              </p>
            </div>

            <div className="mainarea__surveys">
              <ul className="mb-sm">
                <li>
                  TITLE
                  <Link to="#" onClick={sortTitle} className="toggle">
                    {sortOrder === "desc" ? (
                      <img src={desc} className="arrow" alt="" />
                    ) : (
                      <img src={asc} className="arrow" alt="" />
                    )}
                  </Link>
                </li>
                <li>
                  DATE SENT
                  <Link to="#" onClick={sortDate} className="toggle">
                    {sortOrder === "desc" ? (
                      <img src={desc} className="arrow" alt="" />
                    ) : (
                      <img src={asc} className="arrow" alt="" />
                    )}
                  </Link>
                </li>
                <li>DETAILS</li>
                <li>DELETE</li>
              </ul>

              {renderSurveys()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


