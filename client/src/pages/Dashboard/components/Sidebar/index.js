import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { dashBoardPath } from "../../utils/constants";
import Payments from "../Payments";

// Buttons
import Btn_Add from "assets/images/btn-add.svg";
import Btn_Add_Credits from "assets/images/btn-Add-Credits.svg";
import Btn_Credits from "assets/images/btn-Credits.svg";
import Btn_Home from "assets/images/btn-Home.svg";
import Btn_Add_Survey from "assets/images/btn-add-survey.svg";
import Btn_Surveys from "assets/images/btn-Surveys.svg";
import Btn_Email_List from "assets/images/btn-Email-list.svg";

import Drk_Btn_Credits from "assets/images/btn-Credits-drk.svg";
import Drk_Btn_Home from "assets/images/btn-Home-drk.svg";
import Drk_Btn_Add_Survey from "assets/images/btn-Add-Survey-drk.svg";
import Drk_Btn_Surveys from "assets/images/btn-Surveys-drk.svg";
import Drk_Btn_Email_List from "assets/images/btn-Email-list-drk.svg";


import Btn_Light_Mode from "assets/images/light-mode-btn.svg";
import Btn_Dark_Mode from "assets/images/dark-mode-btn.svg";
import Btn_Profile from "assets/images/btn-Profile.svg";
import Btn_Profile_Dark from "assets/images/btn-Profile-drk.svg";
import { toggleUiMode } from "ReduxStore/slices/dashboardUISlice";

export const Sidebar = () => {

  const isSideBarOpen = useSelector((state) => state.dashBoardUi.isSideBarOpen);
  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);
  const dispatch = useDispatch();
  const { surveyList } = useSelector((state) => state.surveys);
  const { user } = useSelector((state) => state.auth);



  const Links = [
    {
      icon: `${uiMode === 'light' ? Btn_Home : Drk_Btn_Home}`,
      heading: 'Home',
      address: `${dashBoardPath}`,
      alt: 'Home'
    },
    {
      icon: `${uiMode === 'light' ? Btn_Add_Survey : Drk_Btn_Add_Survey}`,
      heading: 'Add Survey',
      address: `${dashBoardPath}/surveys/new`,
      alt: 'Add Survey'
    },
    {
      icon: `${uiMode === 'light' ? Btn_Surveys : Drk_Btn_Surveys}`,
      heading: 'Your Surveys',
      address: `${dashBoardPath}/surveylist`,
      pill: true,
      alt: 'Your Surveys',
      pillvalue: surveyList?.length
    },
    {
      icon: `${uiMode === 'light' ? Btn_Credits : Drk_Btn_Credits}`,
      heading: 'Your Credits',
      pill: true,
      alt: 'Your Credits',
      pillvalue: user?.credits
    },
    {
      icon: `${uiMode === 'light' ? Btn_Email_List : Drk_Btn_Email_List}`,
      heading: 'Email List',
      address: `${dashBoardPath}/email-list`,
      alt: 'Email List'
    },
    {
      icon: `${uiMode === 'light' ? Btn_Profile : Btn_Profile_Dark}`,
      heading: 'Profile',
      address: `${dashBoardPath}/profile/${user?._id}`,
      alt: 'Profile'
    },
    {
      heading: 'Add Credits',
      alt: 'Add Credits',
      component: <Payments />
    },
  ]

  const getDesktopLinks = () => {

    return Links.map((link, index) => {
      // Check if the link has an address
      const linkContent = (
        <motion.div 
          className="nav-link"
          key={index}
        >

          {
          
            link.icon && <img src={link.icon} alt={link.alt} className="icon" />
          }

          {
            link.component && link.component
          }

          <motion.h3
            className="heading-3 link-heading"
            initial={{
              opacity: 0,
              display: 'none',
            }}
            animate={
              isSideBarOpen ? {
                opacity: 1,
                display: 'block',
              } : {
                opacity: 0,
                display: 'none',
              }
            }
            transition={{
              duration: 1,
              linear: true,
              opacity: {
                delay: 1,
              },
              display: {
                delay: 1.5,
              }
            }}
          >
            {link.heading}
          </motion.h3>
       

          {link.pill && <div className="pill">
              {link.pillvalue}
            </div>}
        </motion.div>
      );
  
      // If it has an address, wrap it with a Link component
      if (link.address) {
        return (
          <Link to={link.address} key={index}>
            {linkContent}
          </Link>
        );
      }
  
      // If no address, return the content as is
      return linkContent;
    });
  }

  const getBgclass = () => {
    let classes = "bg";
    if (uiMode === "dark") {
      classes += " bg-dark";
    }
    if (isSideBarOpen) {
      classes += uiMode === "dark" ? " active-dark" : " active";
    }
    return classes;
  };
  


  return (
    <div className='dashboard-sidebar'>
      
      <div 
        className={getBgclass()}
      >

        <div className="nav-links">
          {getDesktopLinks()}
        </div>

        <img 
          src={`${uiMode === 'light' ? Btn_Dark_Mode : Btn_Light_Mode}`} 
          alt="" 
          className="icon icon-settings" 
          onClick={() => dispatch(toggleUiMode())}
        />
        
      </div>
    </div>
  )
}
