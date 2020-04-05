import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import Payments from "./Payments";

class Siteheader extends Component {

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

  openSlideMenu() {
   
    document.getElementById("side-menu").style.width = "100%";

    console.log("open");
  }

  closeSlideMenu() {
    document.getElementById("side-menu").style.width = "0";
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <React.Fragment>
            <ul>
              <li>
                <Link to ="/">HOME</Link>
              </li>
              <li>
                <Link to ="/about">ABOUT</Link>
              </li>
              <li>
                <Link to ="/contact">CONTACT</Link>
              </li>
              <li>
                <div 
                  className="btn btn-login"
                  onClick={this.openModalHandler}
                >
                  LOGIN
                </div>
              </li>
            </ul>

            <span className="open-slide">
              <Link to ="#" onClick={() => this.openSlideMenu()}>
                <img src="images/hamburger.png" alt="" />
              </Link>
            </span>

            <div id="side-menu" className="side-nav">
              <li>
                <a
                  href="#"
                  className="btn-close"
                  onClick={() => this.closeSlideMenu()}
                >
                  &times;
                </a>
              </li>
              <li>
                <Link to ="/">HOME</Link>
              </li>
              <li>
                <Link to ="/about">ABOUT</Link>
              </li>
              <li>
                <Link to ="/contact">CONTACT</Link>
              </li>
              <li>
                <div 
                  onClick={this.openModalHandler}
                >
                  LOGIN
                </div>
              </li>
            </div>
          </React.Fragment>
        );

      default:
        return [
          <React.Fragment>

            <ul key="4">
              {/* <li><Link to ="/contact">CONTACT</Link> </li> */}
              <li>
                <Link to ="/dashboard">DASHBOARD</Link>
              </li>
              <li className="logout" key="2">
                <Link to ="/api/logout">Logout</Link>
              </li>
            </ul>

            <span className="open-slide">
              <Link to ="#" onClick={() => this.openSlideMenu()}>
                <img src="images/hamburger.png" alt="" />
              </Link>
            </span>

            <div id="side-menu" className="side-nav">
              <li>
                <Link to ="#"
                  className="btn-close"
                  onClick={() => this.closeSlideMenu()}
                >
                  &times;
                </Link>
              </li>
              <li>
                <Link to ="/dashboard">DASHBOARD</Link>
              </li>
              <li className="logout" key="2">
                <Link to ="/api/logout">Logout</Link>
              </li>
            </div>
          </React.Fragment>
        ];
    }
  }

  render() {
    return (

      <React.Fragment>

         {
           this.state.isShowing ? (
              <div onClick={this.closeModalHandler} className="back-drop" />
            ) : null
         }

        <Modal
           className="modal"
           show={this.state.isShowing}
           close={this.closeModalHandler}
           heading="A header"
        >

          <div className="container">
            <div className="row">
              <div className="logo col-md-12">
                <img src="images/logo-postmaster-med.png" alt="" />
              </div>
            </div>

            <div className="row">
              <div className="loginDir col-md-12">
                <p>
                 Login with whatever method you used to create an account.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="faceGoogle col-md-4 col-md-offset-2">
                <a href="/auth/google">
                  <img src="images/btn-google.png" alt="" />
                </a>
              </div>

              <div className="faceGoogle col-md-4">
                <a href="/auth/facebook">
                  <img src="images/btn-facebook.png" alt="" />
                </a>
              </div>
            </div>

          </div>

        </Modal>

        <nav>
          <div className="row">
            <div className="col-md-2 col-sm-2 col-xs-2 brand-logo">
              <Link to={this.props.auth ? "/dashboard" : "/"}>
                <img src="images/logo-postmaster-med.png" alt="" />
              </Link>
            </div>

            <div className="menu col-md-offset-3 col-md-7">
              {this.renderContent()}
            </div>
          </div>
        </nav>

      </React.Fragment>
     
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Siteheader);
