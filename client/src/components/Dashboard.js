import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SurveyList from './surveys/SurveyList';



const Dashboard = () => {

  return (
       <div>
         <Header />

          <div className="surveylist container">

            <div className="readme" id="readme">

              <p>To send out a YES/NO survey, please click the plus button on the
            bottom right. For your list of recipients, simply enter as many valid emails as you want separated by a comma, no spaces. When a completed survey is successfuly sent. It will be
            shown here on  your dashboard.</p>

            </div>

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
