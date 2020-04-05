import React, { Component } from "react";
import Header from "./Header";
import Modal from "./Modal/Modal";
import Footer from "./Footer";


class Contact extends Component {

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
      <React.Fragment>
        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}

        {/* <button className="open-modal-btn" onClick={this.openModalHandler}>
          Open Modal
        </button> */}

        <Header />
        <div className="contact">
          <div className="content">
            <h2 className="heading-2 mb-md">Questions?</h2>
            <p>If you have any questions, please feel free to contact</p>

            <form action="#" className="contact-form">
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Full Name"
                  id="name"
                  autoComplete="off"
                  required
                  className="input"
                />

                {/* <label htmlFor="name" className="form__label">
                  Full Name
                </label> */}
              </div>

              <div className="form__group">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  autoComplete="off"
                  required
                  className="input"
                />

                {/* <label htmlFor="email" className="form__label">
                  Email
                </label> */}
              </div>

              <div className="form__group">
                <input
                  type="text"
                  placeholder="Subject"
                  id="subject"
                  autoComplete="off"
                  required
                  className="input"
                />

                {/* <label htmlFor="subject" className="form__label">
                  Subject
                </label> */}
              </div>

              <div className="form__group">
                <input
                  type="text"
                  placeholder="Phone"
                  id="phone"
                  autoComplete="off"
                  required
                  className="input"
                />

                {/* <label htmlFor="phone" className="form__label">
                  Phone
                </label> */}
              </div>

              <div className="form__group textarea">
                <textarea
                  type="textarea"
                  placeholder="Comments"
                  id="commnets"
                  autoComplete="off"
                  required
                  className="input"
                  rows="8" 
                  cols="50"
                />

                {/* <label htmlFor="commnets" className="form__label">
                  Comments
                </label> */}
              </div>
            </form>
          </div>

          <Footer />
        </div>
      </React.Fragment>
    );

  }
};

export default Contact;
