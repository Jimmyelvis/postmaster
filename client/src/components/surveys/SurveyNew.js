// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SiteHeader from "../Siteheader";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
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
    return (
      <div className="survey">
        <SiteHeader />

        <div className="container">
          <div className="surveyNew">
            <div className="surveyHeader">
              
            </div>
            <div className="container">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
