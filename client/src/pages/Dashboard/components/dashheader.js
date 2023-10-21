import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import logo from 'images/new-logo.png';

const DashHeader = () => {


  const [isShowing, setIsShowing] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(0);

  const auth = useSelector((store) => {
    return store.auth
  });

  const surveys = useSelector((store) => {
    return store.surveys.surveyList
  });



  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = currentScrollPos < 115;
    setPrevScrollpos(currentScrollPos);
    setVisible(visible);
  };

  const openModalHandler = e => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);



  return (
    <React.Fragment>
      {isShowing ? (
        <div onClick={closeModalHandler} className="back-drop" />
      ) : null}

      <nav
        className={classnames('sitenav', {
          'nav--scrolled': !visible,
        })}
      >
         <div className="container">
            <div className="brand-logo">
              <img src={logo} alt="" />
            </div>
            {width >= 800 ? (
              <div className="header">
              <ul>
                <li>
                  <Link to="/dashboard">HOME</Link>
                </li>
                <li>
                  <Link to="#" className="linkNotify">
                    CREDITS <span className="notification">{auth?.user?.credits}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/surveylist" className="linkNotify">
                    SURVEYS <span className="notification">{surveys?.length}</span>
                  </Link>
                </li>
                <li className="log">
                  <a href="/api/logout">LOGOUT</a>
                </li>
                <li className="profileHeading">
                  {/* <img src={profileimg} alt="" /> */}
                  <h4>
                    Welcome Back
                    <br />
                    {auth?.user?.username}

                  </h4>
                </li>
              </ul>
            </div>
            ) : (
              <div className="mobilemenu">
                <input type="checkbox" className="mobilemenu__checkbox" id="navi-toggle" />
                <label htmlFor="navi-toggle" className="mobilemenu__button">
                  <span className="mobilemenu__icon">&nbsp;</span>
                </label>
                <div className="mobilemenu__background">&nbsp;</div>
                <nav className="mobilemenu__nav">
                  <ul className="mobilemenu__list">
                    <li className="profileHeading">
                      {/* <img src={profileimg} alt="" /> */}
                      <h4>
                        Welcome Back
                        <br />
                        {auth?.user?.username}
                      </h4>
                    </li>
                    <li>
                      <Link to="/dashboard">HOME</Link>
                    </li>
                    <li>
                      <Link to="#" className="linkNotify">
                        CREDITS <span className="notification">{auth?.user?.credits}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/surveylist" className="linkNotify">
                        SURVEYS <span className="notification">{surveys?.length}</span>
                      </Link>
                    </li>
                    <li className="log">
                      <a href="/api/logout">LOGOUT</a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
        
          </div>
      </nav>
    </React.Fragment>
  );
};



export default DashHeader;

