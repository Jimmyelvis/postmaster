import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Navbar } from "components/ui/Layout/Navbar";
import DashHeader from "../pages/Dashboard/components/dashheader";
import Scrolltop from "../utils/ScrollToTop";
import { fetchUser, fetchSurveys } from "ReduxStore"
import { Footer } from "components/ui/Layout/Footer";
import { 
  Dashboard_Home, SurveyList, 
  SurveyDetail, DashLayout,
  SurveyNew } from "pages/Dashboard";

import "./sass/App.scss";

const App = () => {

  const dispatch = useDispatch();
  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const auth = useSelector((store) => {

    console.log("auth: ", store.auth);
    return store.auth
  });

  useEffect(() => {
    
    if (auth.user !== "" || auth.user !== null) {
      dispatch(fetchSurveys());
    } 
  }, [auth, dispatch])
  

  const location = useLocation(); 

  // function to check if the current route is one of the specific routes
  const isSpecificRoute = (pathname) => {
    return ["/", "/about", "/contact"].includes(pathname);
  };

  useEffect(() => {
    // Set the attribute on the document's root element
    document.documentElement.setAttribute('data-theme', uiMode);
    localStorage.setItem('uiMode', uiMode);
}, [uiMode]);




  return (
    <>
      <Scrolltop />

      
  {/* Render the appropriate NavBar component based on the current route */}
  {isSpecificRoute(location.pathname) ? <Navbar /> : ""}

      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/dashboard" 
          element={
            <DashLayout/>
          } 
        >
          <Route index element={<Dashboard_Home />} />
          <Route path="surveylist" element={<SurveyList />} />
          <Route path="surveydetail/:surveyId" element={<SurveyDetail />} />
          <Route path="surveys/new" element={<SurveyNew />} />
        </Route>
   
      </Routes>

  {/* Render the Footer component based on the current route */}
    {isSpecificRoute(location.pathname) ? <Footer /> : ""}
    </>
  );
};


export default App;

{/* <Routes>

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

</Routes> */}