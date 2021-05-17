import React from 'react';
import { BsListUl, BsCheckBox, BsCheckCircle } from "react-icons/bs";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav>
        <ul>          
          <li>
            <a href="/" className={window.location.pathname === '/' ? 'active' : ''}>
              <span>View Hosts</span>
              <BsListUl />
            </a>
          </li>
          <li>
          <a href="/create-host" className={window.location.pathname === '/create-host' ? 'active' : ''}>
              <span>Create Host</span>
              <BsCheckBox />
            </a>
          </li>
          <li>
          <a href="/create-job" className={window.location.pathname === '/create-job' ? 'active' : ''}>
              <span>Create Job</span>
              <BsCheckCircle />
            </a>
          </li>
        </ul>        
      </nav>
    );
  }
}
export default Menu;