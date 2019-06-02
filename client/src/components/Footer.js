import React, { Component } from "react";
import { connect } from "react-redux";

export class Footer extends Component {
  renderContent() {

    let divStyle = {
      padding: "70px 0 0 0",
      minHeight: "60px"
    };

    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <div className="landingFooter"> 
            <div className="container">
              <div className="row">
                <div className="container">
                  <div className="col-md-12">
                    <h3>IMPROVE YOUR BUSINESS</h3>
                  </div>
                  <div className="col-md-4 col-md-offset-4 text-center">
                    <div className="btn btn-signUp-footer"
                      onClick={this.openModalHandler}
                    >
                      <h5>Sign Up</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="copyright col-md-12 col-sm-12 col-xs-12">
              <p>&copy; 2019 ThePostMaster</p>
            </div>
          </div>
        );

      default:
        return (
        
          <div className="landingFooter" style={divStyle}> 

            <div className="copyright col-md-12 col-sm-12 col-xs-12">
              <p>&copy; 2019 ThePostMaster</p>
            </div>

          </div>
        );
    }
  }

  render() {
    return <React.Fragment>

        {this.renderContent()}
      
    </React.Fragment>

  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Footer);
