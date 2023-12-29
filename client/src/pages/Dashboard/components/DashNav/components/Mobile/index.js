import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { dashBoardPath } from "pages/Dashboard/utils/constants";
import Payments from "pages/Dashboard/components/Payments";

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
import LogOutBtn from "assets/images/log-out-btn.svg";
import DrkLogOutBtn from "assets/images/drk-log-out-btn.svg";


import Btn_Light_Mode from "assets/images/light-mode-btn.svg";
import Btn_Dark_Mode from "assets/images/dark-mode-btn.svg";
import { toggleUiMode, closeModal } from "ReduxStore/slices/dashboardUISlice";

export const Mobile = () => {

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);
  const dispatch = useDispatch();
  const { surveyList } = useSelector((state) => state.surveys);
  const { user } = useSelector((state) => state.auth);

  /**
   * useState and other variables
   */

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
      heading: 'Add Credits',
      alt: 'Add Credits',
      component: <Payments />
    },
  ]


  /**
   * Functions
   */
  const getMobileLinks = () => {

    return Links.map((link, index) => {
      // Check if the link has an address
      const linkContent = (
        <>
          {link.icon && <img src={link.icon} alt={link.alt} className="icon" />}

          {link.component && link.component}

          <h3 
            className="heading-3 link-heading"
            onClick={() => {
              link.heading !== 'Add Credits' && link.heading !== 'Your Credits' ? dispatch(closeModal()) :
              console.log('come on man', link.heading);
            }}
          >
              {link.heading}
          </h3>

          {link.pill && <div className="pill">{link.pillvalue}</div>}
        </>
      );
  
      // If it has an address, wrap it with a Link component
      if (link.address) {
        return (
          <Link to={link.address} key={index} className="nav-link">
            {linkContent}
          </Link>
        );
      }
  
      // If no address, return the content as is
      return (
        <div 
          className="nav-link"
          key={index}
        >
          {linkContent}
        </div>
      );
    });
  }

  return (
    <div className="mobile-menu mobile-menu-dashboard">
      <div className="user">
        <a
          href="/api/logout"
          onClick={() => {
            dispatch(closeModal);
          }}
        >
          <img src={uiMode === "dark" ? DrkLogOutBtn : LogOutBtn} alt="" className="icon logout-btn" />
        </a>
        <h3 className="heading-3">
           {user?.username}
        </h3>
      </div>

      <div className="nav-links">{getMobileLinks()}</div>

      <img 
          src={`${uiMode === 'light' ? Btn_Dark_Mode : Btn_Light_Mode}`} 
          alt="" 
          className="icon icon-settings" 
          onClick={() => dispatch(toggleUiMode())}
        />
    </div>
  );
}
