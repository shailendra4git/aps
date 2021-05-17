import React from "react";
import Cookies from 'js-cookie';
import logo from '../../../assets/images/atos-logo-white.png';
import { FaUser } from "react-icons/fa";

const Header = () => {

  const logout = () => {
    Cookies.remove("isLoggedIn");
    window.location.href = "/login";
  }

  return (
    <header className="clearfix">
        <div className="logo"><img  src={logo} width="100" alt="" /></div>
        <div className="title">APS Edge - Host Management</div>
        <div className="user">
          <p><FaUser /> Admin</p>
          <button className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
    </header>
  );
}

export default Header;