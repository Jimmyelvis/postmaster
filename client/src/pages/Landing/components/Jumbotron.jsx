import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { registerUser } from "../../actions";
import { createSlice } from "@reduxjs/toolkit";
import Laptop from "assets/images/laptop.svg";
import DataLock from "assets/images/data-lock.svg";
import Rocket from "assets/images/rocket.svg";
import GreatCloud from "assets/images/great cloud.svg";
import Stevia from "assets/images/stevia.svg";



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
          <p className="mb-sm">Elevate your business with The PostMaster! Effortlessly gather valuable customer insights through follow-up surveys via email.</p>
          <button className="btn btn--signup-header" onClick={openModalHandler}>
            <h5>SIGN UP</h5>
          </button>
        </div>
        <div className="right">
          <img src={Laptop} alt="" className="laptop" />    
        </div>

        <div className="trusted-by">

          <h4 className="heading-4">
            Trusted by
          </h4>

          <ul className="sponsers">
            <li>
              <img src={DataLock} alt="" className="icon" />
            </li>
            <li>
              <img src={Rocket} alt="" className="icon" />
            </li>
            <li>
              <img src={GreatCloud} alt="" className="icon" />
            </li>
            <li>
              <img src={Stevia} alt="" className="icon" />
            </li>

          </ul>

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


