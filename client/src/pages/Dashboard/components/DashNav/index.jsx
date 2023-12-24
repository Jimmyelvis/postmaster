import React, { useState } from "react";
import BlueMenuIcon from "assets/images/Lt-Blue-Menu-Icon.svg";
import DrkBlueMenuIcon from "assets/images/Drk-Blue-Menu-Icon.svg";
import LogOutBtn from "assets/images/log-out-btn.svg";
import DrkLogOutBtn from "assets/images/drk-log-out-btn.svg";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from 'ReduxStore/slices/dashboardUISlice';
import { Search } from "../Search";


export const DashNav = () => {

  const isSideBarOpen = useSelector((state) => state.dashBoardUi.isSideBarOpen);
  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const limit = 75;


  const auth = useSelector((store) => {
    return store.auth
  });

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos < limit);
  };

  window.addEventListener("scroll", handleScroll);

  /*
      Todo: Make this into a separate component. Then use the serach component from Social Sole as guide.
      */

  return (
    <>

      <div className={
        visible ? "dashboard-navbar" : "dashboard-navbar scrolled"
      }>

        <img 
          src={uiMode === 'dark' ? DrkBlueMenuIcon : BlueMenuIcon} 
          alt="" 
          className='icon blue-menu-icon' 
          onClick={() => dispatch(toggleSideBar())}
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
      </div>
    </>
    )

}
