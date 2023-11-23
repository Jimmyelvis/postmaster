import React from 'react'
import PolygonHeader from "assets/images/heading-polygon.svg";


export const Siteheading = ({
  title,
  subtitle,
  hr
}) => {
  return (
    <div className="site-heading">

    <img src={PolygonHeader} alt="" className="polygon" />

    <div className="headings">
      <h2 className="heading-2">{title}</h2>
      <h3 className="heading-3">{subtitle}</h3>
    </div>

    {
      hr && <hr className="line" />
    }

  </div>
  )
}
