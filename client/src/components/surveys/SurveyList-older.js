import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="surveyInfo">
          <div className="col-md-4 col-sm-4 col-xs-4">
            <p>{survey.title}</p>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <p>{new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className="col-md-4 col-sm-4 text-center">
            <div className="btn btn-ghostWhite">Details</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
