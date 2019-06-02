import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

export class RecentSurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().slice(0, 3).map(survey => {
      return (
        <div className="surveyInfo">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <p>{survey.title}</p>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6">
            <p>{new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          {/* <div className="col-md-4 col-sm-4 text-center">
            <div className="btn btn-ghostWhite">Details</div>
          </div> */}
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
)(RecentSurveyList);


