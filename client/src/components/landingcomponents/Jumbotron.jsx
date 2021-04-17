import React, { Component } from "react";
import Modal from "../Modal/Modal"
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../actions";



export class Jumbotron extends Component {

  constructor() {
    super();

    this.state = {
      isShowing: false,
      username: "",
      password: "",
      errors : {}

    }

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

  onRegisterSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.registerUser(userData, this.props.history);

  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

         <div className="jumbotron">


        <div className="left">

          <h2 className="heading-2">The PostMaster</h2>
          <p className="mb-sm">Send Followup Surveys to Customers</p>

          <button className="btn btn--signup-header" onClick={this.openModalHandler}>
            <h5>SIGN UP</h5>
          </button>


        </div>

        <div className="right">
          <img src="images/envelopes.png" alt="" />

        </div>
      </div>

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

          <div className="login">

            <div className="left">

              {/* <img src="images/close.svg" alt="" class="closesvg-tablet"/> */}
              <img src="images/logo.png" alt="" class="login-logo"/>

              <p class="slogan"> Signup for free to get started today </p>
              
              <img src="/images/email-group.svg" alt="" class="email-group" />

            </div>

            <div className="right">

                  <img onClick={this.closeModalHandler} src="/images/close.svg" alt="" class="closesvg" />

                  <span className="errormsg">{this.state.errors.msg}</span>

                

                <form
                  className='authform'
                  onSubmit={this.onRegisterSubmit}
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

export default connect(mapStateToProps, {registerUser})(withRouter(Jumbotron));
