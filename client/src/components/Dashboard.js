import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./dashcomponents/dashheader";
import RecentSurveyList from "./surveys/RecentSurveyList";
import Payments from "./Payments";
import { fetchSurveys } from "../actions";


class Dashboard extends Component {
  componentDidMount() {
     this.props.fetchSurveys();
   }

  render() {
    const { auth, surveys } = this.props;
    let sideContent;

    if (auth === null) {
      sideContent = "loading......";
    } else {
      sideContent = (
        <React.Fragment>
          <div className="newsurvey-btn mb-md">
            <span>
              <Link to="/surveys/new">
                <img src="images/plus-btn.png" alt="" />
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
        <Header />
        <div className="dashboard">
          <div className="dashInfo">
            <div className="sidebar">{sideContent}</div>

            <div className="mainarea">
              <div className="mainarea__heading mb-lg">
                <h2 className="heading-2 mb-md">Welcome to The PostMaster</h2>

                <p>
                  The PostMaster allows you to send custom survey emails to your
                  clients. Clients can answer your emails via a Yes/No option.
                  Please follow the instructions listed below.
                </p>
              </div>

              <div className="mainarea__instructions mb-md">
                <h3 className="heading-3 mb-sm">Instructions</h3>

                <p>
                  Purchase Credits to create Surveys. <br />
                  Create Surveys with a title and a question
                  <br />
                  Send surveys to single/multiple email addresses
                  <br />
                  To View all your sent surveys, go to the Surveys tab <br />
                  To Add Credits, click on the Credits tab
                  <br />
                </p>
              </div>

              <div className="mainarea__surveys">
                <h3 className="heading-3 mb-sm">Your Most Recent Surveys</h3>

                <ul className="mb-sm">
                  <li>TITLE</li>
                  <li>DATE SENT</li>
                  {/* <li>DETAILS</li> */}
                </ul>

                <RecentSurveyList />
              </div>
            </div>
          </div>

          {/* <div className="fixed-action-btn">
            <Link to="/surveys/new" className="addsurvey">
              <img className="addsurvey" src="images/plus-btn.png" alt="" />
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, surveys }) {
  return { auth, surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(Dashboard);
