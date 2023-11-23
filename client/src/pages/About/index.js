import React, { useState } from "react";
import People from "assets/images/people.png";
import { OurTeam } from './components/Ourteam';


const About = () => {
  const [isShowing, setIsShowing] = useState(false);

  const openModalHandler = (e) => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };

  return (
    <>
      {/* {isShowing ? <div onClick={closeModalHandler} className="back-drop" /> : null} */}

      {/* <button className="open-modal-btn" onClick={openModalHandler}>
        Open Modal
      </button> */}

      {/* <Navbar /> */}

      <div className="about">
          <div className="left">
            
          <h2 className="heading-2">About Us</h2>
          <h3 className="heading-3">Who are we as a company</h3>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eligendi itaque tempore qui assumenda tempora quo enim ad non totam delectus voluptas dolore ex dolorem deleniti obcaecati, quidem, laboriosam iusto ea illum? Modi adipisci iste praesentium fuga aut quis velit aliquam, neque, totam nemo maxime ab magni! Mollitia doloremque nobis enim saepe a ullam iste quia atque nihil, natus eaque, corporis nisi ea,
            </p>     
              
              <p> voluptatibus amet exercitationem. Eos cumque maiores, illum exercitationem eum quas? Accusamus, 
            </p>
          </div>

          <div className="right">
            <img src={People} alt="" className="people" />  
          </div>
    
      </div>

      <OurTeam />
    </>
  );
};

export default About;
