import React, { Component } from "react";
import { connect } from "react-redux";

import Welcomemsg from "./landingcomponents/Welcomemsg";
import Header from "./landingcomponents/Landingheader";
import Jumbotron from "./landingcomponents/Jumbotron";
import Ourcomp from "./landingcomponents/Ourcomp";
import Ourteam from "./landingcomponents/Ourteam";
import Customers from "./landingcomponents/Customers";


import Footer from './Footer';


import Modal from "./Modal/Modal";
import { Link } from "react-router-dom";

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false
    };
  }

  openModalHandler = e => {
    e.preventDefault();
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

 

  render() {
    return (
      <>
        <Header />
        <div className="landing">
            <Jumbotron />
            <Welcomemsg/>
            <Ourcomp />
            <Ourteam/>
            <Customers />
            <Footer />
        </div>
      </>
     
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
