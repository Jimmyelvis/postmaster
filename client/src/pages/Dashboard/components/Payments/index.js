import React, { Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import StripeCheckout from 'react-stripe-checkout';
import Btn_Add_Credits from "assets/images/btn-Add-Credits.svg";
import Drk_Btn_Add_Credits from "assets/images/btn-Add-Credits-drk.svg";

import Logo from "assets/images/Single-logo.svg";
import './Stripe.css';
import { handleToken } from 'ReduxStore';

const Payments = () => {

  const uiMode = useSelector((state) => state.dashBoardUi.uiMode);
  const dispatch = useDispatch();


  return (
      <StripeCheckout
        name="The PostMaster"
        description="$5 for 5 email credits"
        image={Logo}
        amount={500}
        token={token => dispatch(handleToken(token))}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
          <img 
            src={uiMode === 'light' ? Btn_Add_Credits : Drk_Btn_Add_Credits}
            alt="Add Credits" 
            className='icon' 
          />
      </StripeCheckout>
    
  );
};

export default Payments;
