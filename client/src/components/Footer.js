import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "./Modal/Modal";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../actions";



export class Footer extends Component {
  constructor() {
    super();

    this.state = {
      isShowing: false,
      username: "",
      password: "",
      errors: {},
    };
  }

  openModalHandler = (e) => {
    e.preventDefault();
    this.setState({
      isShowing: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  onRegisterSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.registerUser(userData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <h2 className="heading-2 mb-md">
              <span className="span-orange">Improve</span> Your Business
            </h2>

            <button
              className="btn btn--signup-header"
              onClick={this.openModalHandler}
            >
              <h5>SIGN UP</h5>
            </button>

            <div className="icons">
              <img
                src="images/icon-facebook.png"
                className="icons__facebook"
                alt=""
              />
              <img
                src="images/icon-twitter.png"
                className="icons__twitter"
                alt=""
              />
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
              <span className="span-orange">Improve</span> Your Business
            </h2>

            <div className="icons">
              <img
                src="images/icon-facebook.png"
                className="icons__facebook"
                alt=""
              />
              <img
                src="images/icon-twitter.png"
                className="icons__twitter"
                alt=""
              />
            </div>

            <div className="copyright">
              <p>&copy; 2020 ThePostMaster</p>
            </div>
          </React.Fragment>
        );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

      setTimeout(() => {
        this.setState({ errors: "" });
      }, 3000);
    }
  }

  render() {


    const { errors } = this.state;


    return (
      <React.Fragment>
        <div className="footer">{this.renderContent()}</div>

        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}

        <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
          heading="Login"
        >
          <div className="login">
            <div className="left">
              {/* <img src="images/close.svg" alt="" class="closesvg-tablet"/> */}
              <img src="images/logo.png" alt="" class="login-logo" />

              <p class="slogan"> Signup for free to get started today </p>

              <img src="/images/email-group.svg" alt="" class="email-group" />
            </div>

            <div className="right">
              <img
                onClick={this.closeModalHandler}
                src="/images/close.svg"
                alt=""
                class="closesvg"
              />

              <span className="errormsg">{this.state.errors.msg}</span>

              <form className="authform" onSubmit={this.onRegisterSubmit}>
                <div className="form-control">
                  <input
                    name="username"
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
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className="input"
                    autoComplete="new-off"
                    required
                  />

                  <label for="password">Password</label>
                </div>

                <button type="submit" className="btn btn--signup-header ">
                  <h5>Register</h5>
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ auth, errors }) {
  return { auth, errors };
}

export default connect(mapStateToProps, { registerUser })(withRouter (Footer));
