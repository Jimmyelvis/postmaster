import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { registerUser } from "../../actions";
import { createSlice } from "@reduxjs/toolkit";




export const Jumbotron = ({ registerUser }) => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const openModalHandler = (e) => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };

  // const onRegisterSubmit = (e) => {
  //   e.preventDefault();

  //   const userData = {
  //     username: auth.username,
  //     password: auth.password,
  //   };

  //   dispatch(registerUser(userData));
  // };

  const onChange = (e) => {
    const { name, value } = e.target;
    // name === "username" ? dispatch(setUsername(value)) : dispatch(setPassword(value));
  };

  return (
    <React.Fragment>
      <div className="jumbotron">
        <div className="left">
          <h2 className="heading-2">The PostMaster</h2>
          <p className="mb-sm">Send Followup Surveys to Customers</p>
          <button className="btn btn--signup-header" onClick={openModalHandler}>
            <h5>SIGN UP</h5>
          </button>
        </div>
        <div className="right">
          <img src="images/envelopes.png" alt="" />
        </div>
      </div>
      {isShowing ? <div onClick={closeModalHandler} className="back-drop" /> : null}
      <Modal className="modal" show={isShowing} close={closeModalHandler} heading="Login">
        <div className="login">
          <div className="left">
            <img src="images/logo.png" alt="" className="login-logo" />
            <p className="slogan"> Signup for free to get started today </p>
            <img src="/images/email-group.svg" alt="" className="email-group" />
          </div>
          <div className="right">
            <img onClick={closeModalHandler} src="/images/close.svg" alt="" className="closesvg" />
            <span className="errormsg">{auth?.errors?.msg}</span>

            <form 
              className="authform" 
              // onSubmit={onRegisterSubmit}
            >
              <div className="form-control">
                <input name="username" type="text" value={auth?.username} onChange={onChange} className="input" autoComplete="new-off" required />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-control">
                <input name="password" type="password" value={auth?.password} onChange={onChange} className="input" autoComplete="new-off" required />
                <label htmlFor="password">Password</label>
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
};


