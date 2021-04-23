import React from 'react';

import Host from './host/Host';
import Header from './header/Header';
import Footer from './footer/Footer';

class Console extends React.Component {
  render() {
    return (
      <>
        <Header></Header>
        <Host></Host>
        <Footer></Footer>
      </>
    );
  }
}

export default Console;