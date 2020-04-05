// import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

const middleware = [reduxThunk];



const store = createStore(
  reducers, 
  {}, 
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);


console.log('Stripe key is', process.env.REACT_APP_STRIPE_KEY);
console.log('Enviroment is', process.env.NODE_ENV);
