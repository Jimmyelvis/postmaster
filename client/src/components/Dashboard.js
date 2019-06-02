import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SiteHeader from "./Siteheader";
import RecentSurveyList from "./surveys/RecentSurveyList";
import Payments from "./Payments";
import { fetchSurveys } from "../actions";


class Dashboard extends Component {
  // componentDidMount() {
  //   this.props.fetchSurveys();
  // }

  render() {
    const { auth, surveys } = this.props;
    let sideContent;

    if (auth === null) {
      sideContent = "loading......";
    } else {
      sideContent = (
        <React.Fragment>
          <div className="row">
            <div className="col-md-12">
              <h3>Dashboard</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>
                <Payments />
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>
                Credits <span className="numTotal">{auth.credits}</span>
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>
                <Link to={"/surveylist"}>
                  Surveys <span className="numTotal">{surveys.length}</span>
                </Link>
              </h4>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <div className="dashboard">
          <SiteHeader />

          <div className="container">
            <div className="dashInfo row">
              <div className="sidebar col-md-3 col-sm-3">{sideContent}</div>

              <div className="info col-md-9 col-sm-9">
                <div className="row">
                  <div className="col-md-12">
                    <h3>Welcome to The PostMaster</h3>

                    <p>
                      The PostMaster allows you to send custom survey emails to
                      your clients. Clients can answer your emails via a Yes/No
                      option. Please follow the instructions listed below.
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h3>Instructions</h3>

                    <p>
                      Purchase Credits to create Surveys. <br />
                      Create Surveys with a title and a question
                      <br />
                      Send surveys to single/multiple email addresses
                      <br />
                      To View all your sent surveys, go to the Surveys tab{" "}
                      <br />
                      To Add Credits, click on the Credits tab
                      <br />
                    </p>
                  </div>
                </div>

                <div className="recent row">
                  <h3>Your Most Recent Surveys</h3>

                  <RecentSurveyList />
                </div>
              </div>
            </div>

            <div className="fixed-action-btn">
              <Link to="/surveys/new" className="addsurvey">
                <img className="addsurvey" src="images/plus.png" alt="" />
              </Link>
            </div>
          </div>
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
