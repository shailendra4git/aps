import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Login from "./login/Login";
import Console from "./console/";
import Cookies from 'js-cookie';

const App = () => {

  let isLoggedIn = Cookies.get("isLoggedIn");
    
  if (isLoggedIn === "true") {
    return (
      <>
      <div id="timeoutError" className="alert alert-danger hide-content">Server error, please try again or contact system administrator</div>
      <Router>
        <Route path="/" component={Console} />        
      </Router>
      </>
    );      
  } else {   
    return (
      <>
      <div id="timeoutError" className="alert alert-danger hide-content">Server error, please try again or contact system administrator</div>
      <Router>
        <Route path="/login" component={Login}/>
        <Redirect to="/login" />
      </Router>
      </>
    );
  }
}

export default App;