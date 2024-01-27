import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Modal from "pages/Dashboard/components/Modal";
import classnames from "classnames";
import Logo from "assets/images/Single-logo.svg";
import { openModal, setOrigin } from "ReduxStore/slices/dashboardUISlice";
import { Login } from "components/ui/Layout/AuthForms/Login";

export const Navbar = () => {
  const limit = 115;

  /*
   */
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);

  const auth = useSelector((store) => {
    return store.auth;
  });

  // const handleScroll = () => {
  //   const currentScrollPos = window.pageYOffset;
  //   setVisible(currentScrollPos < limit);
  // };

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

  const changeBg = () => {
    if (window.scrollY >= 115) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const setNavBarClass = () => {
    if (location.pathname === "/" || location.pathname === "/about") {
      return scrolled ? "landingnav landingnav--scrolled" : "landingnav";
    } else {
      return scrolled ? "sitenav sitenav--scrolled " : "sitenav";
    }
  };

  const checkTarget = () => {
    if (modalTarget === "login modal") {
      return <Login />;
    }
  };

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  window.addEventListener("scroll", changeBg);
  window.addEventListener("resize", updateWindowDimensions);

  return (
    <React.Fragment>
      <nav className={setNavBarClass()}>
        <div className="brand-logo">
          <img src={Logo} alt="" />
        </div>

        <ul
          className={classnames("header", {
            hidden: width <= 800,
          })}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {auth?.user !== "" ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            ""
          )}
          <li className="log">
            {auth?.user !== "" ? (
              <a href="/api/logout">Log Out</a>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  dispatch(openModal());
                  e.preventDefault();
                  setModalTarget("login modal");
                  setCompOrigin("navbar");
                  dispatch(setOrigin("navbar"));
                }}
              >
                Log In
              </a>
            )}
          </li>
        </ul>

        <div
          className={classnames("mobilemenu", {
            hidden: width > 800,
          })}
        >
          <input type="checkbox" className="mobilemenu__checkbox" id="navi-toggle" />

          <label htmlFor="navi-toggle" className="mobilemenu__button">
            <span className="mobilemenu__icon">&nbsp;</span>
          </label>

          <div class="mobilemenu__background">&nbsp;</div>

          <nav className="mobilemenu__nav">
            <ul className="mobilemenu__list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>

              {auth?.user !== "" ? (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              ) : (
                ""
              )}
              <li className="log">
                {auth?.user !== "" ? (
                  <a href="/api/logout">Log Out</a>
                ) : (
                  <a href="#" onClick={(e) => openModalHandler(e)}>
                    Log In
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      <Modal selector={"#modal"} modalTarget={modalTarget} modalOrigin={compOrigin} overlayColor={"rgba(1, 5, 16, 0.94)"}>
        {checkTarget()}
      </Modal>
    </React.Fragment>
  );
};
