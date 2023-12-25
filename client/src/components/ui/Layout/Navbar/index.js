import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "ReduxStore";
import { Modal } from "components/Modal";
import classnames from "classnames";
import Logo from "assets/images/Single-logo.svg";

export const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.errors);

  const [isShowing, setIsShowing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const limit = 115;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const auth = useSelector((store) => {
    return store.auth
  });



  // const handleScroll = () => {
  //   const currentScrollPos = window.pageYOffset;
  //   setVisible(currentScrollPos < limit);
  // };

  const changeBg = () => { 
    
    if(window.scrollY >= 115){
      setScrolled(true);
    }else{
      setScrolled(false);
    }

   }

  const setNavBarClass = () => { 


    if ( location.pathname === "/" || location.pathname === "/about" ) {
      return scrolled ? "landingnav landingnav--scrolled" : "landingnav"
    } else {
      return scrolled ? "sitenav sitenav--scrolled " : "sitenav"
    }

    
  }

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const openModalHandler = (e) => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(loginUser({userData, navigate}));
  };

  const onChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  window.addEventListener("scroll", changeBg);
  window.addEventListener("resize", updateWindowDimensions);

  return (
    <React.Fragment>
      {isShowing ? <div onClick={closeModalHandler} className="back-drop" /> : null}

      <Modal className="modal" show={isShowing} close={closeModalHandler} heading="Login">
        <div className="login marginfix">
          <div className="left">
            {/* <img src="images/close.svg" alt="" class="closesvg-tablet"/> */}
            <img src="images/logo.png" alt="" class="login-logo" />

            <p class="slogan"> Already Have an Account, go ahead and log in</p>

            <img src="/images/email-group.svg" alt="" class="email-group" />
          </div>

          <div className="right">
            <img onClick={() => closeModalHandler()} src="/images/close.svg" alt="" class="closesvg" />

            {/* <span className="errormsg">{errors.msg}</span> */}

            <form className="authform" onSubmit={(e) => onLoginSubmit(e)}>
              <div className="form-control">
                <input name="username" type="text" value={username} onChange={(e) => onChange(e)} className="input" autoComplete="new-off" required />

                <label for="username">Username</label>
              </div>

              <div className="form-control">
                <input name="password" type="password" value={password} onChange={(e) => onChange(e)} className="input" autoComplete="new-off" required />

                <label for="password">Password</label>
              </div>

              <button type="submit" className="btn btn--signup-header ">
                <h5>Login</h5>
              </button>
            </form>
          </div>
        </div>
      </Modal>

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
              <a href="#" onClick={(e) => openModalHandler(e)}>
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
    </React.Fragment>
  );
}
