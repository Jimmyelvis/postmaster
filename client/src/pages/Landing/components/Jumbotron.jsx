import React, { useState } from "react";
import Modal from "components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Laptop from "assets/images/laptop.svg";
import DataLock from "assets/images/data-lock.svg";
import Rocket from "assets/images/rocket.svg";
import GreatCloud from "assets/images/great cloud.svg";
import Stevia from "assets/images/stevia.svg";
import { Register } from "components/ui/Layout/AuthForms/Register";
import { openModal, setOrigin } from "ReduxStore/slices/dashboardUISlice";




export const Jumbotron = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => {
    return store.auth;
  });

    /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
    const [modalTarget, setModalTarget] = useState(null);

    /*
      This will be used to determine what component called the modal
      this will be passed as a prop to the modal component, and the 
      modal context 
    */
    const [compOrigin, setCompOrigin] = useState(null);

    const checkTarget = () => {
      if (modalTarget === "register modal") {
        return <Register />;
      }
    };
  


  return (
    <React.Fragment>
      <div className="jumbotron">
        <div className="left">
          <h2 className="heading-2">The PostMaster</h2>
          <p className="mb-sm">Elevate your business with The PostMaster! Effortlessly gather valuable customer insights through follow-up surveys via email.</p>
          <button className="btn btn--signup-header" onClick={(e) => {
            dispatch(openModal());
            e.preventDefault();
            dispatch(setOrigin("jumbotron"));
            setModalTarget("register modal");
            setCompOrigin("jumbotron");
          }}>
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
      
      <Modal selector={"#modal"} modalTarget={modalTarget} modalOrigin={compOrigin} overlayColor={"rgba(1, 5, 16, 0.94)"}>
        {checkTarget()}
      </Modal>
    </React.Fragment>
  );
};


