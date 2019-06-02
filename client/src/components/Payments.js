import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Stripe.css';



class Payments extends Component {
  render(){


    return(
      <StripeCheckout
        name="ThePostMaster"
        description="$5 for 5 email credits"
        image="images/logo-postmaster-med.png"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
          <a href="#" className="addCredits">Add Credits</a>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
