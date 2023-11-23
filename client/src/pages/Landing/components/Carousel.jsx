import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import Activedot from "assets/images/active-dot.svg";
import Inactivedot from "assets/images/inactive-dot.svg";
import { Siteheading } from "components/ui/Layout/Siteheading";

export const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;

      return result;
    });
  };

  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;

      return result;
    });
  };


  /**
 * Determines the opacity of a person based on their index relative to the current person.
 * 
 * - If the person is the current person, they are displayed with full opacity (1).
 * - If the person is immediately before or after the current person, they are displayed with reduced opacity (0.3).
 * - All other persons are not displayed (opacity set to 0).
 * 
 * @param {number} personIndex - The index of the person for whom the opacity is to be determined.
 * @returns {number} The opacity value for the specified person.
 */

  const opacityFunction = (personIndex) => {

    let opacity;

    if (personIndex === currentPerson) {
      opacity = 1;
    } else if (personIndex === currentPerson - 1) {
      opacity = 0.3;
    } else if (personIndex === currentPerson + 1) {
      opacity = 0.3;
    } else {
      opacity = 0;
    }
    
    return opacity;
  }

  /**
 * Generates a transformation string for positioning and scaling a person based on their index.
 * 
 * - If the person's index matches the current person's index, it scales them to full size (1).
 * - Otherwise, it scales them down to 0.7.
 * - The translation on the X-axis is determined by the difference between the person's index and the current person's index, multiplied by 50%.
 * 
 * @param {number} personIndex - The index of the person to be transformed.
 * @returns {string} - A CSS transform string for translating and scaling the person.
 */

  const transformFunction = (personIndex) => { 

    let scale;

    if (personIndex === currentPerson) {
      scale = 1;
    } else {
      scale = 0.7;
    }

    return`translateX(${50 * (personIndex - currentPerson)}%) scale(${scale})`

   }

  return (
    <div className="slider-container">

      <Siteheading
        title="Testimonials"
        subtitle="What our customers are saying about us"
      />

      <section className="slider">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          return (
            <div
              key={id}
              className="slide"
              style={{
                transform: `${transformFunction(personIndex)}`,
                // opacity: `${personIndex === currentPerson ? 1 : 0}`,
                opacity: `${opacityFunction(personIndex)}`,
                zIndex: `${personIndex === currentPerson ? 200 : 0}`,
                // visibility: `${personIndex === currentPerson ? "visible" : "hidden"}`,
              }}
            >

              <div className="card">

                <img src={image} alt="" className="person-img" />
                <h3 className="heading-3 name">
                  {name}
                </h3>

                <p className="text">{quote}</p>
              </div>

            </div>
          );
        })}

      
      </section>

      <div className="pagination">
        {people.map((person, personIndex) => {
          return (
            <div
              key={person.id}
              className={`dot ${personIndex === currentPerson ? "active" : ""}`}
              onClick={() =>
                {
                  setCurrentPerson(personIndex)
                }
              }
            >
              <img src={` ${personIndex === currentPerson ? Activedot : Inactivedot} `} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
