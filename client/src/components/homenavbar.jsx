import React from 'react';
import {Link} from 'react-router';

export default class HomeNavbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Chutte</a>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to='signup'>Sign Up</Link></li>
              <li><Link to='signin'>Sign In</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
