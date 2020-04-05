import React, { Component } from "react";
import PropTypes from "prop-types";

export class Jumbotron extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="jumbotron">


        <div className="left">

          <h2 className="heading-2">The PostMaster</h2>
          <p className="mb-sm">Send Followup Surveys to Customers</p>

          <button className="btn btn--signup-header">
            <h5>SIGN UP</h5>
          </button>


        </div>

        <div className="right">
          <img src="images/envelopes.png" alt="" />

        </div>
      </div>
    );
  }
}

export default Jumbotron;
