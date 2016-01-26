import React from 'react';
import {Link} from 'react-router';

export default class HomeNavbar extends React.Component {
  render() {
    var icon = (
    <span>
      <a href="/" >
        <img className="logo" src="../assets/chutteLogo.png"  alt="Chutte Logo" height="50" width="50" /> </a>
    </span>
  )
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a  href="#" className="navbar-brand">{icon}</a>
               Chutte
          </div>
          <ul className="nav navbar-nav navbar-right">
              <li><Link to='signup'>Sign Up</Link></li>
              <li><Link to='signin'>Sign In</Link></li>
            </ul>
        </div>
      </nav>
    );
  }
};
