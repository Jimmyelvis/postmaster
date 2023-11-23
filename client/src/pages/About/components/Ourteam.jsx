import {People} from "./People.js";
import PolygonHeader from "assets/images/heading-polygon.svg";
import LeftPoly from "assets/images/left-polygon.svg";
import RightPoly from "assets/images/right-polygon.svg";
import { Siteheading } from "components/ui/Layout/Siteheading";


export const OurTeam = () => {

  const getMembers = () => { 

    let members = People.map((person) => {

      return (
        <div className="member">
          <div className="image-container">
            <img src={person.img} alt="" className="member-image" />
          </div>
          <h5 className="member-name">{person.name}</h5>
          <h6 className="member-title">{person.title}</h6>
          <p className="member-description">{person.description}</p>
        </div>
      );
    });

    return members;

   }


  return (
    <div className="ourteam">

      <Siteheading
        title="Our Team"
        subtitle="Meet the people behind the scenes"
        hr
      />

      {/* <img src={LeftPoly} alt=""  className='leftPoly'/>
      <img src={RightPoly} alt="" className='rightPoly'/> */}
      


      <div className="members">
        {getMembers()}
      </div>
      
    </div>
  );
};


