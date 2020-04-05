import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Ourcomp extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className="ourcomp">

          <h2 className="heading-2 mb-lg">Our Company</h2>

          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. 
          </p>

            <div className="comp-card">
              <img src="images/building.png" className="mb-md" alt=""/>

              <h3 className="heading-3 mb-md">Over 200 Helped Companies</h3>

              <p>
              Velit euismod in pellentesque massa placerat. Enim nunc faucibus a pellentesque sit amet porttitor eget.
              </p>

            </div>

            <div className="comp-card">
              <img src="images/survey.png" className="mb-md" alt=""/>

              <h3 className="heading-3 mb-md">Over 2000 Surveys delivered</h3>

              <p>
              Velit euismod in pellentesque massa placerat. Enim nunc faucibus a pellentesque sit amet porttitor eget.
              </p>

            </div>

      </div>
    )
  }
}

export default Ourcomp
