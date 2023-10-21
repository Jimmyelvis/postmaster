import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RecentSurveyList = () => {
  const { surveyList } = useSelector((store) => store.surveys);


  /*
    Get the 3 most recent surveys from the surveyList array
  */


  const renderSurveys = () => {
    if (surveyList ) {

      // get a copy of the surveyList array so we don't mutate the original
      const surveys = [...surveyList  ]
      return surveys
      .sort((a, b) => new Date(b.dateSent) - new Date(a.dateSent))
      .slice(0, 3).map((survey) => (
        <div className="surveyRecord" key={survey._id}>
          <li>{survey.title}</li>
          <li>{new Date(survey.dateSent).toLocaleDateString()}</li>
          <li>
            <button className="btn btn--ghostWhite">
              <Link to={`/surveydetail/${survey._id}`}>Details</Link>
            </button>
          </li>
          <li>
            {/* <a href="#" onClick={() => deleteSurvey(survey._id)} className="right">
              <i className="fas fa-trash"></i>
            </a> */}
          </li>
        </div>
      ));
    } else {
      return null;
    }
  };

  return <React.Fragment>{renderSurveys()}</React.Fragment>;
};

export default RecentSurveyList;
