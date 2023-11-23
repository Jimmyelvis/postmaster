import React, { useState } from "react";
import Welcomemsg  from "./components/Welcomemsg"
import { Jumbotron } from "./components/Jumbotron";
import { Sellingpoints } from "./components/Sellingpoints";
import { Carousel } from "./components/Carousel";
import { OurComp } from "./components/Ourcomp";
import { OurTeam }  from "../About/components/Ourteam";
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
        <Jumbotron />
        <Sellingpoints />
        <Carousel />
      
    </React.Fragment>
  );
};


export default Landing;
