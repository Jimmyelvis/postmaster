import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import classnames from "classnames";
import { fetchSurveys } from "../../actions";
import logo from "../../images/new-logo.png"
import profileimg from "../../images/profile.png"



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

  }

  componentDidMount() {

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

    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  renderContent() {
    const {  surveyList } = this.props.surveys;
    const { auth } = this.props;


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

              {/*
                      Desktop menu setup. Will only display if window width is greater than 800
                  */}

              <div
                className={classnames("header", {
                  hidden: this.state.width < 800,
                })}
              >
                <ul>
                  <li>
                    <Link to="/dashboard">HOME</Link>
                  </li>
                  <li>
                    <Link to="#" className="linkNotify">
                      CREDITS{" "}
                      <span className="notification">{auth.credits}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/surveylist" className="linkNotify">
                      SURVEYS{" "}
                      <span className="notification">{surveyList.length}</span>
                    </Link>
                  </li>
                  <li className="log">
                    <a href="/api/logout">LOGOUT</a>
                  </li>

                  <li className="profileHeading">
                      <img src={profileimg} alt=""/>
                      <h4>
                          Welcome Back
                          <br />
                          { auth.username }
                      </h4>
                  </li>
                </ul>
              </div>

              {/*
                      Mobile menu setup. Will only display if window width is less than 800
                  */}

              <div
                className={classnames("mobilemenu", {
                  hidden: this.state.width > 800,
                })}
              >
                <input
                  type="checkbox"
                  className="mobilemenu__checkbox"
                  id="navi-toggle"
                />

                <label htmlFor="navi-toggle" className="mobilemenu__button">
                  <span className="mobilemenu__icon">&nbsp;</span>
                </label>

                <div class="mobilemenu__background">&nbsp;</div>

                <nav className="mobilemenu__nav">


                  <ul className="mobilemenu__list">

                      <li className="profileHeading">
                      <img src={profileimg} alt=""/>
                      <h4>
                          Welcome Back
                          <br />
                          { auth.username }
                      </h4>
                  </li>
                    <li>
                      <Link to="/dashboard">HOME</Link>
                    </li>
                    <li>
                      <Link to="#" className="linkNotify">
                        CREDITS{" "}
                        <span className="notification">{auth.credits}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/surveylist" className="linkNotify">
                        SURVEYS{" "}
                        <span className="notification">
                          {surveyList.length}
                        </span>
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

        <nav
          className={classnames("sitenav", {
            "nav--scrolled": !this.state.visible
          })}
        >
  

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
