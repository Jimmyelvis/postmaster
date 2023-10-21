import React from 'react';
import PropTypes from 'prop-types';

const WelcomeMsg = () => {
  return (
    <div className="welcomemsg">
      <h2 className="heading-2 mb-md">Welcome To The PostMaster</h2>
      <div className="lft-rht-contain">
        <div className="left">
          <p>
            A very simple app, that a user can send out surveys to customers to get feedback. This was built with a
            React.js frontend, and a Node.js back-end. This also uses a development version of the Stripe API, to
            process fictional credit card purchases. To use the app simply login with a Google account. To add credits to
            a fictional account, simply use the numbers (4242 4242 4242). This will enable you to test out the
            application.
          </p>
        </div>
        <div className="right">
          <img src="images/monitors.png" alt="" />
        </div>
      </div>
    </div>
  );
};

WelcomeMsg.propTypes = {};

export default WelcomeMsg;
