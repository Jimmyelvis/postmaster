import React, { useState } from "react";

const Contact = () => {
  const [isShowing, setIsShowing] = useState(false);

  const openModalHandler = (e) => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };

  return (
    <>
      {isShowing ? <div onClick={closeModalHandler} className="back-drop" /> : null}

      {/* <button className="open-modal-btn" onClick={openModalHandler}>
        Open Modal
      </button> */}

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

            </div>

          <div className="btn btn--submit-contact">
            <h5>
              Submit
            </h5>
          </div>
          
          </form>

        </div>

      </div>
    </>
  );
};

export default Contact;
