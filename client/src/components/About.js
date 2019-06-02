import React, { Component } from "react";
import Header from "./Siteheader";
import Modal from "./Modal/Modal";


class About  extends Component  {

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

  render(){

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
                  You can sign with a Google login. Click below to register
                  or login.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="faceGoogle col-md-6 col-md-offset-3">
                <a href="/auth/google">
                  <img src="images/btn-google.png" alt="" />
                </a>
              </div>

              {/* <div className="faceGoogle col-md-3">
                <a href="/auth/facebook">
                  <img src="images/btn-facebook.png" alt="" />
                </a>
              </div> */}
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

        <div className="about">
          <Header />
  
          <div className="container">
            <div className="aboutInfo row">
              <div className="squares col-md-6 col-sm-12 col-xs-12">
                <img src="/images/square-images.png" alt="" />
              </div>
              <div className="col-md-6 col-sm-12 col-xs-12">
                <h2>What we are all about</h2>
  
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus eum sed, eius nisi aspernatur assumenda porro nobis
                  maiores ad dolorum asperiores pariatur illo. Temporibus numquam
                  quae natus id. Est dolores, dolorum iusto doloribus accusamus
                  sunt neque facilis iure ea reprehenderit? Molestias placeat aut,
                  non iure ab eligendi modi voluptate. Perferendis voluptate
                  reprehenderit expedita aut mollitia voluptates nesciunt nostrum
                  magnam reiciendis ab quam exercitationem est hic atque, nulla
                  modi a repudiandae vitae fugiat sequi cupiditate! Quisquam.
                </p>
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

 
};

export default About;
