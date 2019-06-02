import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import SiteHeader from "../Siteheader";
import { Link } from "react-router-dom";
import Payments from "../Payments";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {

    const {surveys } = this.props;

    // return(
    //   <h1>HI</h1>
    // )

    
    return surveys.reverse().map(survey => {
      return (
        <div className="surveyInfo">
          <div className="col-md-4 col-sm-4 col-xs-4">
            <p>{survey.title}</p>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <p>{new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="col-md-4 col-sm-4 text-center">
            
            <Link to={`/surveydetail/${survey._id}`} className="btn btn-ghostWhite">
            Details
            </Link> 
            
          </div>
        </div>
      );
    });
  }

  render() {
    const { auth, surveys } = this.props;
    let topContent;

    if (auth === null) {
      topContent = "loading......";
    } else {
      topContent = (
        <React.Fragment>
          <ul>
            <Link to={"/dashboard"}>
              <li>Dashboard</li>
            </Link>
            <li>
              <Payments />
            </li>
            <li>
              Credits: <span className="number">{auth.credits}</span>{" "}
            </li>
            <li>
              Surveys: <span className="number">{surveys.length}</span>{" "}
            </li>
          </ul>
        </React.Fragment>
      );
    }

    return (
      <div>
        <div className="surveylist">
          <SiteHeader />

          <div className="container">
            <div className="dashInfo row">
              <div className="topbar col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-md-12">{topContent}</div>
                </div>
              </div>

              <div className="info col-md-12 col-sm-12">
                <div className="row">
                  <h3>Your Surveys</h3>
                </div>

                <div className="row">{this.renderSurveys()}</div>
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
)(SurveyList);
