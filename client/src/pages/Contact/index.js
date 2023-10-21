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

      </div>
    </>
  );
};

export default Contact;
