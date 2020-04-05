import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Customers extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className="customers">
          <h2 className="heading-2 mb-lg">Over 15,000 customers trust us each month<br/> for their customer feedbacks needs</h2>

          <div className="logos">

            <img src="images/logo-msi.png" className="mb-md" alt=""/>
            <img src="images/logo-sling.png" className="mb-md" alt=""/>
            <img src="images/logo-target.png" className="mb-md" alt=""/>
            <img src="images/logo-apple.png" className="apple mb-md" alt=""/>
          </div>



      </div>
    )
  }
}

export default Customers
