import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from './header/Header';
import Footer from './footer/Footer';
import Menu from './menu/Menu';
import Host from './host/Host';
import CreateHost from './create-host/CreateHost';
import CreateJob from './create-job/CreateJob';

class Console extends React.Component {
  render() {
    return (
      <>
        <Header></Header>
        <div className="page-wrapper">
          <Menu></Menu>
          <div className="page">
            <Router>              
              <Switch>
                <Route path="/" component={Host} exact />
                <Route path="/create-host" component={CreateHost} />
                <Route path="/create-job" component={CreateJob} />   
              </Switch>
            </Router>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
}

export default Console;