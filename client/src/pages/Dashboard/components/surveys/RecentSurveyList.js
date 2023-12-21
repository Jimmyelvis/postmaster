import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dashBoardPath } from 'pages/Dashboard/utils/constants';

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

        <div className="recent-survey" key={survey._id}>

          <h3 className="heading-3 recent-survey__title">
            {survey.title}
          </h3>  

          <p className="recent-survey__date">
            {new Date(survey.dateSent).toLocaleDateString()}
          </p>
        
          <button className="btn btn--primary">
            <Link to={`${dashBoardPath}/surveydetail/${survey._id}`}>Details</Link>
          </button>

        </div>

      ));
    } else {
      return null;
    }
  };

  return (
    <div className='recent-surveys'>  {renderSurveys()} </div>
    )
};

export default RecentSurveyList;
