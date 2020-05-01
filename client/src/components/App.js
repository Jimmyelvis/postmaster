import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyList from './surveys/SurveyList';
import SurveyDetail from "./surveys/SurveyDetail";
import About from "./About";
import Contact  from "./Contact";
import Scrolltop from "../utils/ScrollToTop"

import './sass/App.scss';



class App extends Component {

    componentDidMount() {
      this.props.fetchUser();
    }

    render() {

      console.log(this.props.auth);
      const authenticatedUser = this.props.auth;

      return (
        <BrowserRouter>
          <React.Fragment>
            <Scrolltop />

            {authenticatedUser ? (
              <React.Fragment>
                <Redirect to="/dashboard" />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/surveylist" component={SurveyList} />
                <Route exact path="/surveydetail/:surveyId" component={SurveyDetail} />
                <Route path="/surveys/new" component={SurveyNew} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Redirect to="/" />
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
              </React.Fragment>
            )}
          </React.Fragment>
        </BrowserRouter>

        //  <BrowserRouter>
        //    <React.Fragment>
        //      <Scrolltop />
        //      <Route exact path="/" component={Landing} />
        //      <Route exact path="/about" component={About} />
        //      <Route exact path="/contact" component={Contact} />
        //      <Route exact path="/dashboard" component={Dashboard} />
        //      <Route exact path="/surveylist" component={SurveyList} />
        //      <Route exact path="/surveydetail/:surveyId" component={SurveyDetail} />
        //      <Route path="/surveys/new" component={SurveyNew} />
        //    </React.Fragment>
        //  </BrowserRouter>
      );
    }
};

function mapStateToProps({ auth }) {
  return { auth };
}


export default connect(mapStateToProps, actions)(App);
