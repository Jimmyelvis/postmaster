import React, { Component } from 'react'
import { connect } from "react-redux";


export class Footer extends Component {
  
  renderContent() {

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <h2 className="heading-2 mb-md">
             <span className="span-orange">Improve</span>  Your Business
            </h2>

            <button className="btn btn--signup-header">
              <h5>SIGN UP</h5>
            </button>

            <div className="icons">
              <img src="images/icon-facebook.png" className="icons__facebook" alt=""/>
              <img src="images/icon-twitter.png" className="icons__twitter" alt=""/>
            </div>

            <div className="copyright">
              <p>&copy; 2020 ThePostMaster</p>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <h2 className="heading-2 mb-md">
             <span className="span-orange">Improve</span>  Your Business
            </h2>

            <div className="icons">
              <img src="images/icon-facebook.png" className="icons__facebook" alt=""/>
              <img src="images/icon-twitter.png" className="icons__twitter" alt=""/>
            </div>
            
            <div className="copyright">
              <p>&copy; 2020 ThePostMaster</p>
            </div>
          </React.Fragment>
        );
    }

  }

  render() {
    return (
      <div className="footer">
        {this.renderContent()}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Footer);

