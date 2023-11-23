import React from 'react'
import PeopleEmail from "assets/images/people-email.svg";
import TableLaptop from "assets/images/table-laptop.svg";
import Building from "assets/images/building.svg";
import SurveyIcon from "assets/images/survey-icon.svg";
import LeftPoly from "assets/images/left-polygon.svg";
import RightPoly from "assets/images/right-polygon.svg";


export const Sellingpoints = () => {
  return (
    <div className="selling-points">

      <img src={LeftPoly} alt=""  className='leftPoly'/>
      <img src={RightPoly} alt="" className='rightPoly'/>

      <div className="entries">

        <div className="entry">
          <div className="left">
            <img src={PeopleEmail} alt="" />
          </div>

          <div className="right">
            <h3 className="heading-3">Create Email Surveys</h3>

            <p className="mb-sm">Send beautifully designed surveys directly to your customers' email inboxes. Collect feedback effortlessly without requiring users to visit a website or app.</p>
          </div>
        </div>

        <div className="entry">
          <div className="left">
            <img src={TableLaptop} alt="" />
          </div>

          <div className="right">
            <h3 className="heading-3">Ease of Use</h3>

            <p className="mb-sm">A User-Friendly Interface. Intuitive design for effortless survey creation. No technical skills required; create surveys in minutes.</p>
          </div>
        </div>

        <div className="entry">
          <div className="left">
            <img src={SurveyIcon} alt="" />
          </div>

          <div className="right">
            <h3 className="heading-3">Over 2000 Surveys delivered</h3>

            <p className="mb-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex illum necessitatibus aperiam omnis fugit? Facere, dolores eum nemo, minus, ipsum quisquam a reiciendis illum sit numquam obcaecati delectus ullam?</p>
          </div>
        </div>

        <div className="entry">
          <div className="left">
            <img src={Building} alt="" />
          </div>

          <div className="right">
            <h3 className="heading-3">Over 200 Helped Companies</h3>

            <p className="mb-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex illum necessitatibus aperiam omnis fugit? Facere, dolores eum nemo, minus, ipsum quisquam a reiciendis illum sit numquam obcaecati delectus ullam?</p>
          </div>
        </div>


      </div>

    </div>
  );
}
