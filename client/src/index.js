import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'ReduxStore';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);

console.log('Stripe key is', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);
