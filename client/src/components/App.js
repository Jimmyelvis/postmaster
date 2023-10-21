import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import Landing from "../pages/Landing";
import { Dashboard_Home, SurveyList, SurveyDetail, SurveyNew } from "pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Navbar } from "components/ui/Layout/Navbar";
import DashHeader from "../pages/Dashboard/components/dashheader";
import Scrolltop from "../utils/ScrollToTop";
import { fetchUser } from "ReduxStore"

import "./sass/App.scss";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const auth = useSelector((store) => {
    return store.auth
  });

  const authenticatedUser = auth?.user;
  const location = useLocation(); 

  // function to check if the current route is one of the specific routes
  const isSpecificRoute = (pathname) => {
    return ["/", "/about", "/contact"].includes(pathname);
  };




  return (
    <>
      <Scrolltop />

      
  {/* Render the appropriate NavBar component based on the current route */}
  {isSpecificRoute(location.pathname) ? <Navbar /> : <DashHeader />}

      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard_Home />
          } 
        />
        <Route 
          path="/surveylist" 
          element={ <SurveyList />} 
        />
        <Route 
          path="/surveydetail/:surveyId" 
          element={
           <SurveyDetail />
          } 
        />
        <Route 
          path="/surveys/new" 
          element={
           <SurveyNew />
          }
        />
      
      </Routes>
    </>
  );
};


export default App;
