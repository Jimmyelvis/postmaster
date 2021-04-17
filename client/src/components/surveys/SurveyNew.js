// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import SiteHeader from "../dashcomponents/dashheader";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import Payments from "../Payments";
import * as actions from "../../actions";
import { fetchSurvey } from "../../actions";
import plus from "../../images/plus-btn.png"

/*
The overall component that houses both the new survey creation component and the survey
review component

*/

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview === true) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
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
                <h2 className="heading-2 mb-md">Create Your Survey</h2>

              </div>
              <div className="survey">
                  {this.renderContent()}
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

SurveyNew = connect(mapStateToProps, { fetchSurvey })(SurveyNew);

SurveyNew = reduxForm({
  form: "surveyForm"
})(SurveyNew);

export default SurveyNew;

// export default connect(mapStateToProps, { fetchSurvey })(reduxForm({
//   form: "surveyForm"
// }))(SurveyNew);


// export default reduxForm({
//   form: "surveyForm"
// })(SurveyNew);
