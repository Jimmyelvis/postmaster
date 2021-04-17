import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../actions";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import classnames from "classnames";

class Landingheader extends Component {

  constructor() {
    super();

    this.navRef = React.createRef();

    this.state = {
      isShowing: false,
      prevScrollpos: window.pageYOffset,
      visible: true,
      limit: 115,
      width: 0,
      height: 0,
      username: "",
      password: "",
      errors : {}

    };

    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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

   onLoginSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
    // this.props.setAlert('Login Successful', 'success');

  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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

   componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

      setTimeout(() => {
        this.setState({ errors: "" });
      }, 3000);
    }
  }

  renderContent() {
      
    switch (this.props.auth) {
      case null:
        return (
          <div>
            NULL
          </div>
        ) ;

      case false:
        return (
          <React.Fragment>
            <div className="container">
              <div className="brand-logo">
                <img src="images/new-logo.png" alt="" />
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
                    <Link to="/about">ABOUT</Link>
                  </li>
                  <li>
                    <Link to="/contact">CONTACT</Link>
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

                <div className="mobilemenu__background">
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
        return(
          <React.Fragment>
          <div className="container">
            <div className="brand-logo">
              <img src="images/new-logo.png" alt="" />
            </div>

            <div className={classnames("header", {
                "hidden" : this.state.width < 800
              })}
            >
              <ul>
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/about">ABOUT</Link>
                </li>
                <li>
                  <Link to="/contact">CONTACT</Link>
                </li>
                <li className="log">
                  <a href="/api/logout">
                    LOGOUT
                  </a>             
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
                      <a href="/api/logout">LOG OUT</a>
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

    const { errors } = this.state;


    return (
      <React.Fragment>
        {
           this.state.isShowing ? (
              <div  onClick={this.closeModalHandler} className="back-drop" />
            ) : null
         }

        <Modal
           className="modal"
           show={this.state.isShowing}
           close={this.closeModalHandler}
           heading="Login"
        >

          {/* 
              <a className="btn-google" href="/auth/google">
                <img src="images/btn-google.png" alt="" />
              </a>

              <a className="btn-facebook" href="/auth/facebook">
                <img src="images/btn-facebook.png" alt="" />
              </a> */}
         

          <div className="login marginfix" >

            <div className="left">

              {/* <img src="images/close.svg" alt="" class="closesvg-tablet"/> */}
              <img src="images/logo.png" alt="" class="login-logo"/>

              <p class="slogan"> Already Have an Account,
               go ahead and log in</p>
              
              <img src="/images/email-group.svg" alt="" class="email-group" />

            </div>

            <div className="right">

                  <img onClick={this.closeModalHandler} src="/images/close.svg" alt="" class="closesvg" />
                
                  <span className="errormsg">{this.state.errors.msg}</span>


                <form
                  className='authform'
                  onSubmit={this.onLoginSubmit}
                >
                  <div className="form-control">

                    <input
                      name='username'
                      type="text"
                      value={this.state.username}
                      onChange={this.onChange}
                      className="input"
                      autoComplete="new-off"
                      required
                    />

                    <label for="username">Username</label>

                  </div>

                  <div className="form-control">

                      <input
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.onChange}
                        className="input"
                        autoComplete="new-off"
                        required
                      />

                    <label for="password">Password</label>


                  </div>

                  <button type='submit' className="btn btn--signup-header ">
                    <h5>Login</h5>
                  </button>
                </form>

            </div>

          </div>
            

        



        </Modal>

        <nav 
          className={classnames("landingnav", {
            "landingnav--scrolled" : !this.state.visible
          })}
          
        >
            {this.renderContent()}

      
        </nav>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ auth, errors }) {
  return { auth, errors };
}

export default connect(mapStateToProps, {loginUser})(withRouter (Landingheader));
