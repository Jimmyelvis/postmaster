import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SurveyList from './surveys/SurveyList';



const Dashboard = () => {

  return (
       <div>
         <Header />

          <div className="surveylist container">

             <SurveyList />

              <div className="fixed-action-btn">

                  <Link to="/surveys/new" className="addsurvey">
                    <img className="addsurvey" src="images/plus.png" alt=""/>
                  </Link>

              </div>

          </div>

       </div>
  );

};


export default Dashboard;
