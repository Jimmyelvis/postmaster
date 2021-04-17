import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSurveys,
  deleteSurvey,
  sortSurveysTitleAsc,
  sortSurveysTitleDesc,
  sortSurveysDateAsc,
  sortSurveysDateDesc,
} from "../../actions";
import SiteHeader from "../dashcomponents/dashheader";
import { Link } from "react-router-dom";
import Payments from "../Payments";
import asc from "../../images/arrow-up.svg";
import desc from "../../images/arrow-down.svg";

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSortedAscTitle: false,
      isSortedAscDate: false,
    };
  }

  componentDidMount() {
    this.props.fetchSurveys();
  }

  sortTitle = (e) => {
    e.preventDefault();

    if (this.state.isSortedAscTitle === false) {
      this.props.sortSurveysTitleAsc();
    } else {
      this.props.sortSurveysTitleDesc();
    }

    this.setState((prevState) => ({
      isSortedAscTitle: !prevState.isSortedAscTitle,
    }));

    console.log(this.state.isSortedAscTitle);
  };

  sortDate = (e) => {
    e.preventDefault();

    if (this.state.isSortedAscDate === false) {
      this.props.sortSurveysDateAsc();
    } else {
      this.props.sortSurveysDateDesc();
    }

    this.setState((prevState) => ({
      isSortedAscDate: !prevState.isSortedAscDate,
    }));

    console.log(this.state.isSortedAscDate);
  };

  renderSurveys() {
    if (this.props.surveys.surveyList && this.props.surveys.surveyList.length) {
      return this.props.surveys.surveyList.reverse().map((survey) => {
        return (
          <div className="surveyRecord">
            <li>{survey.title}</li>
            <li>{new Date(survey.dateSent).toLocaleDateString()}</li>
            <li>
              <button className="btn btn--ghostWhite">
                <Link to={`/surveydetail/${survey._id}`}>Details</Link>
              </button>
            </li>
            <li>
              <a
                href="#"
                onClick={() => this.props.deleteSurvey(survey._id)}
                className="right"
              >
                <i class="fas fa-trash"></i>
              </a>
            </li>
          </div>
        );
      });
    } else {
      return (
        <React.Fragment>
          <br/>
            <h3>No Surveys Found</h3>
        </React.Fragment>
      );
    }
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
                <h3>New Survey</h3>
              </Link>
            </span>
          </div>

          <Payments />
        </React.Fragment>
      );
    }

    if (this.props.surveys.surveyList && this.props.surveys.surveyList.length) {
      return (
        <div>
          <SiteHeader />
          <div className="dashboard">
            <div className="dashInfo">
              <div className="sidebar">{sideContent}</div>

              <div className="mainarea">
                <div className="mainarea__heading mb-lg">
                  <h2 className="heading-2 mb-md">Your Surveys</h2>

                  <p style={{ textAlign: "center" }}>
                    These are your survey that you have sent out. Starting from
                    the most recent one.
                  </p>
                </div>

                <div className="mainarea__surveys">
                  <ul className="mb-sm">
                    <li>
                      TITLE
                      <Link to="#" onClick={this.sortTitle} className="toggle">
                        {this.state.isSortedAscTitle === false ? (
                          <img src={asc} className="arrow" alt="" />
                        ) : (
                          <img src={desc} className="arrow" alt="" />
                        )}
                      </Link>
                    </li>
                    <li>
                      DATE SENT
                      <Link to="#" onClick={this.sortDate} className="toggle">
                        {this.state.isSortedAscDate === false ? (
                          <img src={asc} className="arrow" alt="" />
                        ) : (
                          <img src={desc} className="arrow" alt="" />
                        )}
                      </Link>
                    </li>
                    <li>DETAILS</li>
                    <li>DELETE</li>
                  </ul>

                  {this.renderSurveys()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <SiteHeader />
          <div className="dashboard">
            <div className="dashInfo">
              <div className="sidebar">{sideContent}</div>

              <div className="mainarea">
                <div className="mainarea__heading mb-lg">
                  <h2 className="heading-2 mb-md">Your Surveys</h2>

                  <p style={{ textAlign: "center" }}>
                    These are your survey that you have sent out. Starting from
                    the most recent one.
                  </p>
                </div>

                <div className="mainarea__surveys">
                  <ul className="mb-sm">
                    <li>
                      TITLE
                      <Link to="#" onClick={this.sortTitle} className="toggle">
                        {this.state.isSortedAscTitle === false ? (
                          <img src={asc} className="arrow" alt="" />
                        ) : (
                          <img src={desc} className="arrow" alt="" />
                        )}
                      </Link>
                    </li>
                    <li>
                      DATE SENT
                      <Link to="#" onClick={this.sortDate} className="toggle">
                        {this.state.isSortedAscDate === false ? (
                          <img src={asc} className="arrow" alt="" />
                        ) : (
                          <img src={desc} className="arrow" alt="" />
                        )}
                      </Link>
                    </li>
                    <li>DETAILS</li>
                    <li>DELETE</li>
                  </ul>

                  {this.renderSurveys()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ auth, surveys }) {
  return { auth, surveys };
}

export default connect(mapStateToProps, {
  fetchSurveys,
  deleteSurvey,
  sortSurveysTitleAsc,
  sortSurveysTitleDesc,
  sortSurveysDateAsc,
  sortSurveysDateDesc,
})(SurveyList);
