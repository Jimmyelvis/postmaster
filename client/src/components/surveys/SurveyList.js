import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey  } from "../../actions";
import SiteHeader from "../dashcomponents/dashheader";
import { Link } from "react-router-dom";
import Payments from "../Payments";
import asc from "../../images/arrow-up.svg"
import desc from "../../images/arrow-down.svg"


class SurveyList extends Component {

  componentDidMount() {
    this.props.fetchSurveys();

  }

  /*

  Code for sorting method to be implemented soon

  constructor(props) {
    super(props);
      this.state = {
        surveyList: [],
        isFirstinLine: false
      }
    
  }

  componentDidMount() {
    this.props.fetchSurveys();

    const surveyList = this.props.surveys;

    this.setState({
      isFirstinLine: true,
      surveyList: surveyList
    })

  }

  toggleTitle = (e) => {
    e.preventDefault();

    

    const {surveyList} = this.state
    let newSurveyList = surveyList

      if (this.state.isFirstinLine) {
        newSurveyList = surveyList.sort((a, b) => (a.title < b.title) ? 1 : -1);

      } else {
        newSurveyList = surveyList.sort((a, b) => (a.title > b.title) ? 1 : -1);
      }

      this.setState({
        isFirstinLine: !this.state.isFirstinLine,
        surveyList: newSurveyList,
      });

     
  }

  toggleDate = (e) => {
    e.preventDefault();

    const {surveyList} = this.state
    let newSurveyList = surveyList

      if (this.state.isFirstinLine) {
        newSurveyList = surveyList.sort((a, b) => (a.dateSent < b.dateSent) ? 1 : -1);

      } else {
        newSurveyList = surveyList.sort((a, b) => (a.dateSent > b.dateSent) ? 1 : -1);
      }

      this.setState({
        isFirstinLine: !this.state.isFirstinLine,
        surveyList: newSurveyList,
      });

     
  }

  */


  renderSurveys() {

    /*
      Sorting method to be implemented soon
    


    const { surveyList } = this.state;

    if (this.state.surveyList && this.state.surveyList.length) {

      return (
        <div>
          {
            surveyList.map((survey, index) => {
  
              return (
                <div className="surveyRecord" key={`${index}`}>
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
            })
          }
        </div>
      )

    } else {
      return (
        <div>
          loading......
        </div>
      )
    }
    
   */

    if (this.props.surveys && this.props.surveys.length) {

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
            <li>
                <a href="#" onClick={() => this.props.deleteSurvey(survey._id)} className="right">
                  <i class="fas fa-trash"></i>
                </a>
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

    const { auth, surveys } = this.props;
    // const { isFirstinLine } = this.state;

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

                  <p style={{ textAlign: "center" }}>
                    These are your survey that you have sent out. Starting from
                    the most recent one.
                  </p>
                </div>

                <div className="mainarea__surveys">
                  <ul className="mb-sm">
                    <li>
                      TITLE
                      {/* <a href="#" onClick={this.toggleTitle} className="toggle">
                        {
                        isFirstinLine === false ? 
                          <img src={asc} className="arrow" alt=""/> : 
                          <img src={desc} className="arrow" alt=""/> 
                        }
                      </a> */}
                    </li>
                    <li>
                      DATE SENT
                    {/* <a href="#" onClick={this.toggleDate} className="toggle">
                        {
                        isFirstinLine === false ? 
                          <img src={asc} className="arrow" alt=""/> : 
                          <img src={desc} className="arrow" alt=""/> 
                        }
                      </a> */}
                    </li>
                    <li>DETAILS</li>
                    <li>DELETE</li>
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
  { fetchSurveys, deleteSurvey }
)(SurveyList);
