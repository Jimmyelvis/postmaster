import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
// import * as actions from '../../../../actions';
import './Stripe.css';

const Payments = ({ handleToken }) => {
  return (
    <div className="stripeModal newsurvey-btn mb-md">
      <StripeCheckout
        name="ThePostMaster"
        description="$5 for 5 email credits"
        // image="images/logo-postmaster-med.png"
        amount={500}
        token={token => handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <a href="#">
          <h3>Add Credits</h3>
        </a>
      </StripeCheckout>
    </div>
  );
};

export default Payments;
