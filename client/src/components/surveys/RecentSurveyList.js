import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { Link } from "react-router-dom";


export class RecentSurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();
  }

  

  renderSurveys() {

    if (this.props.surveys && this.props.surveys.length) {

      return this.props.surveys.reverse().slice(0, 3).map(survey => {
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
      
    } else {
      return(
      <React.Fragment>
      </React.Fragment>
      )
      
    }
    
    
  }


  render() {
    return <React.Fragment>{this.renderSurveys()}</React.Fragment>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}



export default connect(
  mapStateToProps,
  { fetchSurveys }
)(RecentSurveyList);


