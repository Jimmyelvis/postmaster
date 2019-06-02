import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SiteHeader from "../Siteheader";
import Payments from "../Payments";
import * as actions from "../../actions";
import { fetchSurvey } from "../../actions";

class SurveyDetail extends Component {

  // componentDidMount() {
  //   const { surveyId } = this.props.match.params;
  //   surveyId && this.props.fetchSurvey(surveyId);
  // }

  componentDidMount() {

    if (this.props.match.params.surveyId) {
      this.props.fetchSurvey(this.props.match.params.surveyId);
    }
  }

  render() {
    const { auth, surveys } = this.props;
    let sideContent;
    let surveyContent;

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
                <a href="/surveyList" >
                  Surveys <span className="numTotal"></span>
                </a>
              </h4>
            </div>
          </div>
        </React.Fragment>
      );
    }

    if (surveys.recipients === null) {
      surveyContent = "loading......";
    } else {
      surveyContent = (
        <React.Fragment>
          <div className="row">
            <div className="infodetails col-md-6">
              <h3>Survey Title</h3>

              <p>{surveys.title}</p>

              <h3>Survey Subject</h3>

              <p>{surveys.subject}</p>

              <h3>Survey Body</h3>

              <p>{surveys.body}</p>
            </div>

            <div className="col-md-6">
              <h3>Survey Results</h3>

              <p>
                YES <span className="badge badge-yes">{surveys.yes}</span>
              </p>
              <p>
                NO <span className="badge badge-no">{surveys.no}</span>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="return col-md-12">
              <a href="/surveyList" className="btn btn-return">
                RETURN
              </a>
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div>
        <div className="surveydetail">
          <SiteHeader />

          <div className="container">
            <div className="dashInfo row">
              <div className="sidebar col-md-3 col-sm-3">{sideContent}</div>

              <div className="info col-md-9 col-sm-9">
                <div className="surveyHeader">
                  <h2>Survey Detail</h2>
                </div>
                {surveyContent}
              </div>
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
  { fetchSurvey }
)(SurveyDetail);
