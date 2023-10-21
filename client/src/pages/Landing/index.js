import React, { useState } from "react";
import Welcomemsg  from "./components/Welcomemsg"
import { Jumbotron } from "./components/Jumbotron";
import { OurComp } from "./components/Ourcomp";
import { OurTeam }  from "./components/Ourteam";
import { Customers } from "./components/Customers";

const Landing = () => {
  const [isShowing, setIsShowing] = useState(false);

  const openModalHandler = (e) => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <div className="landing">
        <Jumbotron />
        <Welcomemsg />
        <OurComp />
        <OurTeam />
        <Customers />
      </div>
    </React.Fragment>
  );
};


export default Landing;
