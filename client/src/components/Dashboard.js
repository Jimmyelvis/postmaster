import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SurveyList from './surveys/SurveyList';



const Dashboard = () => {

  return (
       <div>
         <Header />
         <SurveyList />

          <div className="fixed-action-btn">

              <Link to="/surveys/new" className="btn-floating btn-large blue">
                <i className="material-icons">add_circle</i>
              </Link>

          </div>

       </div>
  );

};


export default Dashboard;
