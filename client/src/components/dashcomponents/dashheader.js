import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import classnames from "classnames";
import { fetchSurveys } from "../../actions";
import logo from "../../images/new-logo.png"


export class dashheader extends Component {

  constructor() {
    super();

    this.navRef = React.createRef();

    this.state = {
      isShowing: false,
      prevScrollpos: window.pageYOffset,
      visible: true,
      limit: 115,
      width: 0,
      height: 0
    };

    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {

    // this.props.fetchSurveys();
    window.addEventListener("scroll", this.handleScroll);

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);

    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });

    // mobilemenu();

    console.log('====================================');
    console.log(this.state.width);
    console.log('====================================');
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

  // Adjust menu background based on pageYOffset position
  handleScroll = () => {
    const { prevScrollpos, limit } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = currentScrollPos < limit;

    console.log('====================================');
    console.log(currentScrollPos);
    console.log('====================================');

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  renderContent() {
    const { auth, surveys } = this.props;

    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <React.Fragment>
          <div className="container">
            <div className="brand-logo">
              <img src={logo} alt="" />
            </div>

            <div
              className={classnames("header", {
                hidden: this.state.width <= 800
              })}
            >
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/about" className="linkNotify">
                    CREDITS <span className="notification">15</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="linkNotify">
                    SURVEYS <span className="notification">15</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">SUPPORT</Link>
                </li>
                <li className="log" onClick={this.openModalHandler}>
                  <a href="#">LOGIN</a>
                </li>
              </ul>
            </div>

            <div
              className={classnames("mobilemenu", {
                hidden: this.state.width > 800
              })}
            >
              <input type="checkbox" className="mobilemenu__checkbox" id="navi-toggle"/>

              <label htmlFor="navi-toggle" className="mobilemenu__button">
                <span className="mobilemenu__icon">&nbsp;</span>
              </label>

              <div class="mobilemenu__background">
                  &nbsp;
              </div>

              <nav className="mobilemenu__nav">
                
                <ul className="mobilemenu__list">
                  <li>
                    <Link to="/">HOME</Link>
                  </li>
                  <li>
                    <Link to="/about">ABOUT</Link>
                  </li>
                  <li>
                    <Link to="/contact">CONTACT</Link>
                  </li>
                  <li className="log" onClick={this.openModalHandler}>
                    <a href="#">LOGIN</a>
                  </li>
                </ul>

              </nav>
            </div>
          </div>
        </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <div className="container">
              <div className="brand-logo">
                <img src={logo} alt="" />
              </div>

              <div
                className={classnames("header", {
                  hidden: this.state.width < 800
                })}
              >
                <ul>
                  <li>
                    <Link to="/dashboard">HOME</Link>
                  </li>
                  <li>
                    <Link to="#" className="linkNotify">
                      CREDITS <span className="notification">{auth.credits}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/surveylist" className="linkNotify">
                      SURVEYS <span className="notification">{surveys.length}</span>
                    </Link>
                  </li>
                  <li className="log">
                    <a href="/api/logout">LOGOUT</a>href
                  </li>
                </ul>
              </div>

              <div
                className={classnames("mobilemenu", {
                  hidden: this.state.width > 800
                })}
              >
                <input type="checkbox" className="mobilemenu__checkbox" id="navi-toggle"/>

                <label htmlFor="navi-toggle" className="mobilemenu__button">
                  <span className="mobilemenu__icon">&nbsp;</span>
                </label>

                <div class="mobilemenu__background">
                    &nbsp;
                </div>

                <nav className="mobilemenu__nav">
                  
                  <ul className="mobilemenu__list">
                    <li>
                      <Link to="/dashboard">HOME</Link>
                    </li>
                    <li>
                      <Link to="#" className="linkNotify">
                        CREDITS <span className="notification">{auth.credits}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/surveylist" className="linkNotify">
                        SURVEYS <span className="notification">{surveys.length}</span>
                      </Link>
                    </li>
                    <li className="log">
                      <a href="/api/logout">LOGOUT</a>
                    </li>
                  </ul>

                </nav>
              </div>

            </div>
          </React.Fragment>
        );
    }
  }


  

  render() {
    return (
      <React.Fragment>
        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}

        {/* <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
          heading="Login"
        >
          <p className="directions">
            Login with whatever method you used to create an account.
          </p>

          <div onClick={this.closeModalHandler} className="closebtn">
            X
          </div>

          <a className="btn-google" href="/auth/google">
            <img src="images/btn-google.png" alt="" />
          </a>

          <a className="btn-facebook" href="/auth/facebook">
            <img src="images/btn-facebook.png" alt="" />
          </a>
        </Modal> */}

        <nav
          className={classnames("sitenav", {
            "nav--scrolled": !this.state.visible
          })}
        >
          {/* <div className="brand-logo">
              <Link to={this.props.auth ? "/dashboard" : "/"}>
                <img src="images/logo-postmaster-med.png" alt="" />
              </Link>
            </div> */}

          {this.renderContent()}
        </nav>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ auth, surveys }) {
  return { auth, surveys };
}

export default connect(mapStateToProps, { fetchSurveys } )(dashheader);
