import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import SiteHeader from "../dashcomponents/dashheader";
import { Link } from "react-router-dom";
import Payments from "../Payments";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {

    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="surveyRecord">
            
              <li>{survey.title}</li>
              <li>{new Date(survey.dateSent).toLocaleDateString()}</li>
              <li>
                <button className="btn btn--ghostWhite">
                  <Link to={`/surveydetail/${survey._id}`}>Details</Link>
                </button>
              </li>
            
          </div>
      );
    });
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

    if (this.props.surveys && this.props.surveys.length) {
      return (
        <div>
          <SiteHeader />
          <div className="dashboard">
            <div className="dashInfo">
              <div className="sidebar">{sideContent}</div>

              <div className="mainarea">
                <div className="mainarea__heading mb-lg">
                  <h2 className="heading-2 mb-md">Your Surveys</h2>

                  <p>
                    These are your survey that you have sent out. Starting from
                    the most recent one.
                  </p>
                </div>

                <div className="mainarea__surveys">

                  <ul className="mb-sm">
                    <li>TITLE</li>
                    <li>DATE SENT</li>
                    {/* <li>DETAILS</li> */}
                  </ul>

                  {this.renderSurveys()}
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
      
    } else {
      return(<div></div>)
    }
    
  }
}

function mapStateToProps({ auth, surveys }) {
  return { auth, surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
