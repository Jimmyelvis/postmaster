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
    
    const { auth, surveys } = this.props;
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

    if (surveys.recipients === null) {
      surveyContent = "loading......";
    } else {
      surveyContent = (
        <React.Fragment>

          <div className="surveycontent">

            <div className="infodetails">

              <h3 className="heading-3">Survey Title</h3>

              <p>{surveys.title}</p>

              <h3 className="heading-3">Survey Subject</h3>

              <p>{surveys.subject}</p>

              <h3 className="heading-3">Survey Body</h3>

              <p>{surveys.body}</p>

            </div>

            <div className="results">
              <h3 className="heading-3">Survey Results</h3>


              <div className="yesnodata">

                <p>
                  YES <span className="badge badge-yes">{surveys.yes}</span>
                </p>
                <p>
                  NO <span className="badge badge-no">{surveys.no}</span>
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

                  <p>
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
