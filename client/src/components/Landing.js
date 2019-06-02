import React, { Component } from "react";
import Header from "./Header";
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
      <div>
        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}

        {/* <button className="open-modal-btn" onClick={this.openModalHandler}>
          Open Modal
        </button> */}

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
                  You can sign up with a Google, or Facebook login. Click below to register.
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

            {/* <div className="row">
              <div className="forms col-md-12">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>

                  <div className="btn btn-registerModal">REGISTER</div>
                </form>
              </div>
            </div> */}

          </div>
        </Modal>

        <div className="landing">
          <Header />

          <div className="container">
            <div className="title row">
              <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
                <h1>The PostMaster</h1>
                <h2>Send Followup Suverys to Customers</h2>
              </div>

              <div className="col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                <p>
                  Welcome to The PostMaster where you can send followup surveys
                  to your customers.
                </p>
              </div>

              <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-12  text-center">
                <div
                  className="btn btn-signUp-Landing"
                  onClick={this.openModalHandler}
                >
                  <h5>Sign Up</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="ourTeam">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h3>Our Team</h3>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                    nam nihil ab deserunt quasi odit sit esse aut molestias
                    aliquid et ducimus fuga enim exercitationem ipsa expedita
                    qui, consectetur tempora commodi voluptas recusandae optio
                    magni quaerat! Neque ea enim nihil commodi, ex quae
                    consequuntur placeat voluptas tempore architecto iste sunt
                    quasi.
                  </p>
                </div>
                <div className="col-md-6">
                  <img className="circles" src="images/circles.png" />
                </div>
              </div>
            </div>
          </div>

          <div className="customers">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    Over 15,000 customers trust us each month for their customer
                    feedbacks needs{" "}
                  </p>
                </div>

                <div className="custLogos col-md-12">
                  <li>
                    <img src="images/AutoZone_logo.png" />
                  </li>
                  <li>
                    <img src="images/Geico_logo.png" />
                  </li>
                  <li>
                    <img src="images/Kohls_logo.png" />
                  </li>
                  <li>
                    <img src="images/logo-target.png" />
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="landingFooter">
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="col-md-12">
                  <h3>IMPROVE YOUR BUSINESS</h3>
                </div>
                <div className="col-md-4 col-md-offset-4 text-center">
                  <div
                    className="btn btn-signUp-footer"
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
      </div>
    );
  }
}

export default Landing;
