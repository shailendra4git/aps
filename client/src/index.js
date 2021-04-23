import React from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";
// import Cookies from 'js-cookie';
import './index.scss';

import App from './app/App';
import * as serviceWorker from './serviceWorker';

let apiTimeout = 60000;

Axios.interceptors.request.use(function (config) {

    config.timeout = apiTimeout;

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator'); 
    
    return config
  }, function (error) {
    return Promise.reject(error);
  });
  
  Axios.interceptors.response.use(function (response) {
  
    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    document.body.classList.remove('loading-indicator');
    document.getElementById("timeoutError").classList.remove("show-content");

    // if(response.data.statuscode === 401){
    //   Cookies.remove("isLoggedIn");
    //   Cookies.remove("username");
    //   window.location.href = "/login";
    // }
      
    return response;
        
  }, function (error) {
    document.body.classList.remove('loading-indicator');
    document.getElementById("timeoutError").classList.add("show-content");
    return Promise.reject(error);
  });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
