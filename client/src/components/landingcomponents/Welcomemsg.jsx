import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Welcomemsg extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className="welcomemsg">

          <h2 className="heading-2 mb-md">Welcome To The PostMaster</h2>


          <div className="lft-rht-contain">

            <div className="left">

            

                <p>
                A very simple app, that a user can send out surveys to customers to get feedback. This was built with a React.js frontend, and a Node.js back-end. This also uses a development version of the Stripe api, to process fictional credit card purchases. To use the app simply login with a google account. To add credits to a fictional account. Simply use the numbers (4242 4242 4242). This will enable you to test out the application.
                </p>
            </div>

            <div className="right">

            

              <img src="images/monitors.png" alt=""/>
            </div>
            
          </div>


    
      </div>
    )
  }
}

export default Welcomemsg
