import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SiteHeader from "../dashcomponents/dashheader";
import Payments from "../Payments";
import * as actions from "../../actions";
import { fetchSurvey } from "../../actions";
import plus from "../../images/plus-btn.png"

class SurveyDetail extends Component {


  componentDidMount() {

    if (this.props.match.params.surveyId) {
      this.props.fetchSurvey(this.props.match.params.surveyId);
    }
  }

  render() {
    
    const { survey } = this.props.surveys;
    const { auth } = this.props;
    let sideContent;
    let surveyContent;

    if (auth === null) {
      sideContent = "loading......";
    } else {
      sideContent = (
        <React.Fragment>
          <div className="newsurvey-btn mb-md">
            <span>
              <Link to="/surveys/new">
                <img src={plus} alt="" />

                <h3>New Survey</h3>
              </Link>
            </span>
          </div>

          <Payments />
        </React.Fragment>
      );
    }

    if (survey.recipients === null) {
      surveyContent = "loading......";
    } else {
      surveyContent = (
        <React.Fragment>

          <div className="surveycontent">

            <div className="infodetails">

              <h3 className="heading-3">Survey Title</h3>

              <p>{survey.title}</p>

              <h3 className="heading-3">Survey Subject</h3>

              <p>{survey.subject}</p>

              <h3 className="heading-3">Survey Body</h3>

              <p>{survey.body}</p>

            </div>

            <div className="results">
              <h3 className="heading-3">Survey Results</h3>


              <div className="yesnodata">

                <p>
                  YES <span className="badge badge-yes">{survey.yes}</span>
                </p>
                <p>
                  NO <span className="badge badge-no">{survey.no}</span>
                </p>

              </div>

            </div>

          <Link to="/surveyList" className="btn btn--return">
            RETURN
          </Link>
          
          </div>

          
          

        </React.Fragment>
      );
    }

    return (
      <div>
        <SiteHeader />
        <div className="dashboard">

            <div className="dashInfo">
              <div className="sidebar">{sideContent}</div>

              <div className="mainarea">

                <div className="mainarea__heading mb-lg">
                  <h2 className="heading-2 mb-md">Survey Details</h2>

                  <p style={{ textAlign: 'center' }}>
                    An informational overview of this survey 
                  </p>
                </div>

                {surveyContent}

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
