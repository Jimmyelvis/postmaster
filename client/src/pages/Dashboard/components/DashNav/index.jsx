import React, { useState, useEffect } from "react";
import BlueMenuIcon from "assets/images/Lt-Blue-Menu-Icon.svg";
import DrkBlueMenuIcon from "assets/images/Drk-Blue-Menu-Icon.svg";
import LogOutBtn from "assets/images/log-out-btn.svg";
import DrkLogOutBtn from "assets/images/drk-log-out-btn.svg";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from 'ReduxStore/slices/dashboardUISlice';
import { Search } from "../Search";
import { openModal } from "ReduxStore/slices/dashboardUISlice";
import Modal from 'pages/Dashboard/components/Modal';
import { Mobile } from "./components/Mobile";


export const DashNav = () => {

  /* 
    useState variables, and constants
  */
  const [visible, setVisible] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

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

  const isSideBarOpen = useSelector((state) => state.dashBoardUi.isSideBarOpen);
  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);
  const dispatch = useDispatch();
  const limit = 75;
  
  const auth = useSelector((store) => {
    return store.auth
  });
  

  /* 
    Functions 
  */

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos < limit);
  };

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);

  };

  const checkTarget = () => {

    if (modalTarget === "mobile menu modal") {

      console.log("mobile menu modal");

      return (
        <Mobile />
      );
    }
  };

  window.addEventListener("scroll", handleScroll);

  /* 
    useEffects 
  */
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);

  }, [windowWidth]);


  return (
    <>

      <div className={
        visible ? "dashboard-navbar" : "dashboard-navbar scrolled"
      }>

     
        {
          /*
            Determine what instructions the onClick event should follow
            based on the window width. If the window width is less than
            1000px, then the modal will be opened, otherwise the sidebar
            will be toggled.
          */
        }
        <img 
          src={uiMode === 'dark' ? DrkBlueMenuIcon : BlueMenuIcon} 
          alt="" 
          className='icon blue-menu-icon' 
          onClick={() => 
            {
              windowWidth < 1000 ? 
              (
                setModalTarget("mobile menu modal"),
                setCompOrigin("mobile menu"),
                dispatch(openModal("mobile menu"))
              )
                : 
              dispatch(toggleSideBar())
            }
          }
        />
      
    
        <Search />

        <div className="user">
          <h3 className="heading-3">
            Welcome back, <span className="username">
            {auth?.user?.username}
            </span>
          </h3>

          <a href="/api/logout">
            <img src={uiMode === "dark" ? DrkLogOutBtn : LogOutBtn} alt="" className='icon logout-btn' />
          </a>
        </div>

        <Modal
          selector={"#modal"}
          modalTarget={modalTarget}
          modalOrigin={compOrigin}
          overlayColor={"rgba(1, 5, 16, 0.94)"}
        >
          {checkTarget()}
        </Modal>

      </div>
    </>
    )

}
